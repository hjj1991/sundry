"use client";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";

// TOC 컴포넌트
export default function CustomTOC({ title }: { title: string }) {
    const [tocItems, setTocItems] = useState<{ id: string; text: string; level: number }[]>([]);
    const [isOpen, setIsOpen] = useState(true); // TOC 열림 상태 관리

    useEffect(() => {
        const headings = Array.from(document.querySelectorAll('article h2, article h3, article h4'));
        const items = headings.map(heading => ({
            id: heading.id,
            text: heading.textContent || '',
            level: parseInt(heading.tagName.substring(1)),
        }));
        setTocItems(items);
    }, []);

    const toggleTOC = () => {
        setIsOpen(prev => !prev); // TOC 열림 상태를 토글
    };

    return (
        <div className="bg-card border rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                    {title}
                </h2>
                <button
                    onClick={toggleTOC}
                    className="flex items-center text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                    {isOpen ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
                </button>
            </div>
            <ul className={cn("space-y-2 text-sm", isOpen ? 'block' : 'hidden')}>
                {tocItems.length > 0 ? (
                    tocItems.map((item, index) => (
                        <li key={index} className={cn(
                            "relative",
                            item.level === 3 && "ml-4",
                            item.level === 4 && "ml-8"
                        )}>
                            <a
                                href={`#${item.id}`}
                                className="text-muted-foreground hover:text-primary transition-colors duration-300"
                            >
                                {item.text}
                            </a>
                        </li>
                    ))
                ) : (
                    <li className="text-muted-foreground">목차를 찾을 수 없습니다.</li>
                )}
            </ul>
        </div>
    );
};
