'use client';
import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface FloatingActionButtonsProps {
  onAIChatOpen: () => void;
}

export default function ScrollToTopAndShareButton({ onAIChatOpen }: FloatingActionButtonsProps) {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const pathname = usePathname();

  const checkScrollTop = () => {
    setIsScrollButtonVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL이 클립보드에 복사되었습니다!'))
      .catch(err => console.error('URL 복사 실패:', err));
  };

  // Hide AI Chat and Share buttons on the AI Chat page itself
  const showButtons = !pathname.startsWith('/ai-chat');

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
      {showButtons && (
        <>
          <button
            onClick={onAIChatOpen}
            className="p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 hover:scale-110"
            aria-label="AI Chat"
          >
            <MessageCircle size={24} />
          </button>
          <button
            onClick={shareUrl}
            className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
            aria-label="Share URL"
          >
            <Share2 size={24} />
          </button>
        </>
      )}
      <button
        onClick={scrollToTop}
        className={cn(
          'p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-all duration-300 hover:scale-110',
          isScrollButtonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
