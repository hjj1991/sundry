'use client';

import { useAIChat } from '@/components/financial/AIChatContext';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import PageTitle from '@/components/PageTitle';
import { AIChatMessage } from '@/components/financial/AIChatMessage';


export default function AIChatPage() {
  const { messages, isLoading, sendMessage, loadingMessage, isTyping } = useAIChat();
  const [input, setInput] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <PageTitle
        title="AI 금융 어시스턴트"
        description="궁금한 금융 정보를 마음껏 물어보세요. AI가 친절하게 답변해드립니다."
      />
      <div ref={chatContainerRef} className="flex-1 space-y-4 overflow-y-auto rounded-md border p-4 my-4 shadow-md">
        {messages.map((msg) => (
          <AIChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <AIChatMessage
            message={{ role: 'assistant', content: loadingMessage }}
            isLoading={true}
          />
        )}
        {isTyping && !isLoading && (
          <AIChatMessage
            message={{ role: 'assistant', content: '' }}
            isTyping={true}
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
        <Input
          placeholder="예: 아이를 위한 최고의 적금 상품은 뭐야?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading} aria-label="전송" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
