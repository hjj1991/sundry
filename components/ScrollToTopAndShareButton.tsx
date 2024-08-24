"use client";
import { useEffect, useState } from 'react';
import { ArrowUp, Share2 } from 'lucide-react';

export default function ScrollToTopAndShareButton() {
    const [isScrollButtonVisible, setIsScrollButtonVisible] = useState(false);

    const checkScrollTop = () => {
        if (window.scrollY > 300) {
            setIsScrollButtonVisible(true);
        } else {
            setIsScrollButtonVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    const shareUrl = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                alert('URL이 클립보드에 복사되었습니다!');
            })
            .catch(err => {
                console.error('URL 복사 실패:', err);
            });
    };

    return (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2">
            {/* 스크롤 최상단 버튼 (스크롤에 따라 나타남) */}
            <button
                onClick={scrollToTop}
                className={`p-3 bg-teal-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${isScrollButtonVisible ? 'opacity-100' : 'opacity-0'}`}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24}/>
            </button>

            {/* 항상 보이는 공유 버튼 */}
            <button
                onClick={shareUrl}
                className="p-3 bg-blue-500 text-white rounded-full shadow-lg"
                aria-label="Share URL"
            >
                <Share2 size={24}/>
            </button>
        </div>
    );
}
