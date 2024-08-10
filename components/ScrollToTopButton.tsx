"use client";
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const checkScrollTop = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
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

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 p-3 bg-teal-500 text-white rounded-full shadow-lg transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} />
        </button>
    );
};
