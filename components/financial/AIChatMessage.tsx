'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import { ChatMessage } from '@/types/financials';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIChatMessageProps {
  message: Pick<ChatMessage, 'role' | 'content'>;
  isLoading?: boolean;
  isTyping?: boolean;
}

export function AIChatMessage({ message, isLoading = false, isTyping = false }: AIChatMessageProps) {
  const { role, content } = message;
  const isUser = role === 'user';

  if (isTyping) {
    return (
      <div className="flex items-start gap-4 animate-pulse">
        <Avatar className="h-8 w-8 border">
          <AvatarFallback>
            <Bot />
          </AvatarFallback>
        </Avatar>
        <div className="rounded-lg p-3 text-sm bg-muted">
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-start gap-4">
        <Avatar className="h-8 w-8 border">
          <AvatarFallback>
            <Bot />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-start gap-4 animate-fade-in', isUser && 'justify-end')}>
      {!isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback>
            <Bot />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'rounded-lg p-3 text-sm',
          isUser
            ? 'bg-secondary text-secondary-foreground'
            : 'bg-muted',
        )}
      >
        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:my-4 prose-p:my-2 prose-ul:my-2 prose-li:my-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
