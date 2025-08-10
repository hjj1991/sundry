'use client';

import React, { createContext, useState, useContext, useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage as ChatMessageType } from '@/types/financials';

interface AIChatContextType {
  messages: ChatMessageType[];
  sendMessage: (content: string) => void;
  isLoading: boolean;
  isTyping: boolean;
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

  useEffect(() => {
    const loadingMessage = messages.find((msg) => msg.isLoading);
    if (!loadingMessage) return;

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % loadingMessages.length;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessage.id ? { ...msg, content: loadingMessages[index] } : msg
        )
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [messages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessageType = {
      id: uuidv4(),
      role: 'user',
      content: content,
      createdAt: new Date(),
    };

    const assistantMessage: ChatMessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: loadingMessages[0], // Start with the first loading message
        createdAt: new Date(),
        isLoading: true,
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    try {
      const url = `/api/ai-search?query=${encodeURIComponent(content)}`;
      const es = new EventSource(url);
      let firstChunk = true;
      let fullContent = '';

      es.onmessage = (e: MessageEvent) => {
        if (e.data.startsWith('[DONE]')) {
          es.close();
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessage.id ? { ...msg, isTyping: false } : msg
            )
          );
          return;
        }

        try {
          const parsedData = JSON.parse(e.data);
          const textChunk = parsedData.content || '';
          fullContent += textChunk;

          if (firstChunk) {
            firstChunk = false;
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessage.id
                  ? { ...msg, content: textChunk, isLoading: false, isTyping: true }
                  : msg
              )
            );
          } else {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessage.id
                  ? { ...msg, content: fullContent }
                  : msg
              )
            );
          }
        } catch (error) {
          console.error('Error parsing SSE data:', error, 'Raw data:', e.data);
        }
      };

      es.onerror = (err: Event) => {
        console.error('SSE error', err);
        es.close();
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === assistantMessage.id
                    ? { ...msg, content: '스트리밍 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.', isLoading: false, isTyping: false }
                    : msg
            )
        );
      };
    } catch (error) {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === assistantMessage.id
                    ? { ...msg, content: '오류가 발생했습니다.', isLoading: false, isTyping: false }
                    : msg
            )
        );
    }
  }, []);

  const isLoading = messages.some((msg) => msg.isLoading);
  const isTyping = messages.some((msg) => msg.isTyping);

  return (
    <AIChatContext.Provider value={{ messages, sendMessage, isLoading, isTyping }}>
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