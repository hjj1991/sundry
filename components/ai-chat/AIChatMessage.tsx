'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User, Loader } from 'lucide-react';
import { ChatMessage } from '@/types/financials';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

interface AIChatMessageProps {
  message: ChatMessage;
}

export function AIChatMessage({ message }: AIChatMessageProps) {
  const { role, content, isLoading, isTyping } = message;
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
        <div className="rounded-lg p-3 text-sm bg-muted flex items-center gap-2">
            <Loader className="animate-spin h-4 w-4" />
            <p className="text-muted-foreground">{content}</p>
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
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted',
        )}
      >
        <div
          className={cn(
            'prose prose-sm max-w-none dark:prose-invert prose-headings:my-4 prose-p:my-2 prose-ul:my-2 prose-li:my-1',
            isUser && 'text-primary-foreground prose-p:text-primary-foreground prose-li:text-primary-foreground prose-strong:text-primary-foreground prose-blockquote:text-primary-foreground'
          )}
        >
            <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                {content}
            </ReactMarkdown>
        </div>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarImage src="/common/profile.jpeg" alt="User avatar" />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
