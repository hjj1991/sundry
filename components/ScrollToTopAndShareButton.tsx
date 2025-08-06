"use client";
import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, Plus, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonsProps {
  onAIChatOpen: () => void;
}

export default function ScrollToTopAndShareButton({ onAIChatOpen }: FloatingActionButtonsProps) {
  const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkScrollTop = () => {
    setIsScrollButtonVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('URL이 클립보드에 복사되었습니다!'))
      .catch(err => console.error('URL 복사 실패:', err));
    setIsMenuOpen(false);
  };
  
  const handleAIChatOpen = () => {
    onAIChatOpen();
    setIsMenuOpen(false);
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2">
      {/* Action Buttons */}
      <div
        className={cn(
          'flex flex-col items-center gap-2 transition-all duration-300 ease-in-out',
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <button
          onClick={handleAIChatOpen}
          className="p-3 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
          aria-label="AI Chat"
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={shareUrl}
          className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          aria-label="Share URL"
        >
          <Share2 size={24} />
        </button>
        <button
          onClick={scrollToTop}
          className={cn(
            'p-3 bg-teal-500 text-white rounded-full shadow-lg hover:bg-teal-600 transition-opacity duration-300',
            isScrollButtonVisible ? 'opacity-100' : 'opacity-0'
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-4 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 transition-transform duration-300"
        aria-label="Toggle menu"
        style={{ transform: isMenuOpen ? 'rotate(45deg)' : 'rotate(0)' }}
      >
        <Plus size={28} />
      </button>
    </div>
  );
}