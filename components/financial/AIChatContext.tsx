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
      const response = await fetch(`/api/ai-search?query=${encodeURIComponent(content)}`);

      if (!response.ok) {
        throw new Error('AI 응답을 가져오는데 실패했습니다.');
      }

      const data = await response.json();

      const assistantMessage: ChatMessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: data.displayResponse || '죄송합니다. 답변을 생성하지 못했습니다.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [isLoading]);

  return (
    <AIChatContext.Provider value={{ messages, isLoading, sendMessage, loadingMessage }}>
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
