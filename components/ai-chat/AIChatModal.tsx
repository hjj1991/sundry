'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Send, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AIChatMessage } from '@/components/ai-chat/AIChatMessage';
import { useAIChat } from '@/components/ai-chat/AIChatContext';

interface AIChatModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AIChatModal({ isOpen, onOpenChange }: AIChatModalProps) {
  const { messages, isLoading, sendMessage, loadingMessage, isTyping } = useAIChat();
  const [input, setInput] = useState('');

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(input);
    setInput('');
  };


  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>AI 금융 어시스턴트</span>
          </DialogTitle>
          <DialogDescription>
            찾고 싶은 금융 상품의 조건을 말씀해주세요. AI가 가장 적합한 상품을
            찾아드릴게요.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            ref={chatContainerRef}
            className="h-96 space-y-4 overflow-y-auto rounded-md border p-4"
          >
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
        </div>
        <DialogFooter>
          <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
            <Input
              placeholder="예: 연 5% 이상 적금 추천해줘"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">전송</span>
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}