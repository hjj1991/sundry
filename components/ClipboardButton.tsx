// components/Pre.tsx
"use client";
import {useRef, useState} from "react";
import {Check, Clipboard} from "lucide-react"; // 아이콘 임포트

interface PreProps {
    children?: React.ReactNode;
    props?: React.HTMLAttributes<HTMLPreElement>;
}

export const Pre = ({children, ...props}: PreProps) => {
    const preRef = useRef<HTMLPreElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyText = async () => {
        const text = preRef.current?.innerText;
        await navigator.clipboard.writeText(text ?? "");

        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 3000);
    };

    return (
        <div className="relative">
            {/* 복사 버튼 */}
            <div className="absolute top-2 right-2 z-10">
                <button
                    onClick={handleCopyText}
                    className={`p-2 rounded-md ${
                        isCopied ? "bg-green-500" : "bg-blue-500"
                    } text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center`}
                >
                    {isCopied ? (
                        <Check size={16}/>
                    ) : (
                        <Clipboard size={16}/>
                    )}
                </button>
            </div>
            <pre {...props} ref={preRef} className="p-4 bg-gray-800 text-white rounded-md overflow-x-auto">
                {children}
            </pre>
        </div>
    );
};
