'use client';

import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage as ChatMessageType } from '@/types/financials';

interface AIChatContextType {
  messages: ChatMessageType[];
  isLoading: boolean;
  isTyping: boolean;
  sendMessage: (content: string) => Promise<void>;
  loadingMessage: string;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

const loadingMessages = [
  '최신 금융 데이터를 불러오고 있어요.',
  '가장 적합한 상품을 꼼꼼히 비교하고 있어요.',
  'AI가 가장 좋은 선택지를 고르고 있습니다... 🤖',
  '거의 다 찾았어요! 잠시만 기다려주세요.',
];

export function AIChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);

  useEffect(() => {
    if (isLoading) {
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[index]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessageType = {
      id: uuidv4(),
      role: 'user',
      content: content,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      const url = `/api/ai-search?query=${encodeURIComponent(content)}`;

      // 네이티브 EventSource로 스트림 수신 (fetch + reader 파싱 금지)
      const es = new EventSource(url);

      const assistantMessageId = uuidv4();
      let assistantContent = '';

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: 'assistant',
          content: '',
          createdAt: new Date(),
        },
      ]);

      // 첫 메시지 유실 방지를 위해 즉시 핸들러 등록
      es.onmessage = (e: MessageEvent) => {
        // 서버가 [DONE]을 보낼 경우 종료 처리
        if (e.data === '[DONE]') {
          es.close();
          setIsLoading(false);
          setIsTyping(false);
          return;
        }
        // 멀티라인 data는 \n로 합쳐진 상태로 도착
        assistantContent += e.data;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: assistantContent } : msg,
          ),
        );
      };

      es.onerror = (err: Event) => {
        console.error('SSE error', err);
        es.close();
        setIsLoading(false);
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            role: 'assistant',
            content: '스트리밍 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
            createdAt: new Date(),
          },
        ]);
      };
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [isLoading]);

  return (
    <AIChatContext.Provider value={{ messages, isLoading, sendMessage, loadingMessage, isTyping }}>
      {children}
    </AIChatContext.Provider>
  );
}

export function useAIChat() {
  const context = useContext(AIChatContext);
  if (context === undefined) {
    throw new Error('useAIChat must be used within an AIChatProvider');
  }
  return context;
}
