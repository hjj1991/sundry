"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';

// TOC 컴포넌트
export default function CustomTOC({ title }: { title: string }) {
    const [tocItems, setTocItems] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(true); // TOC 열림 상태 관리

    useEffect(() => {
        // 페이지 로드 후 TOC 항목을 추출
        const items = Array.from(document.querySelectorAll('.toc-link')).map(link => link.getAttribute('href') || '');
        setTocItems(items);
    }, []);

    const toggleTOC = () => {
        setIsOpen(prev => !prev); // TOC 열림 상태를 토글
    };

    return (
        <div className="toc bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                    {title}
                </h2>
                <button
                    onClick={toggleTOC}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300"
                >
                    {isOpen ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                </button>
            </div>
            <ul className={`list-disc list-inside space-y-2 ${isOpen ? 'block' : 'hidden'} dark:text-gray-200`}>
                {tocItems.length > 0 ? (
                    tocItems.map((item, index) => (
                        <li key={index} className="relative pl-4">
                            <a href={item} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300">
                                {item.replace('#', '').replace(/-/g, ' ')} {/* Optional: Format URL slug to readable text */}
                            </a>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500 dark:text-gray-400">No items found</li>
                )}
            </ul>
        </div>
    );
};
