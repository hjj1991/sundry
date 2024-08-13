// components/ui/footer.tsx
import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from "next/image"; // 아이콘 가져오기

export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 p-6 text-center">
            <p>
                이 페이지에는 ㈜여기어때컴퍼니가 제공한 <strong>여기어때 잘난체</strong>가 적용되어 있습니다.
            </p>
            <p>
                라이센스 정보는 <Link href="/licenses" className="text-blue-500 hover:underline">여기</Link>에서 확인하실 수 있습니다.
            </p>
            <div className="flex justify-center space-x-6 mt-2">
                <a href="https://github.com/hjj1991" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                    <Image
                        src="/common/github-mark.png"
                        alt="Github"
                        width={24}
                        height={24}
                        className="block dark:hidden" // 다크 모드가 아닐 때 표시
                        priority
                    />
                    <Image
                        src="/common/github-mark-white.png" // 다크 모드일 때 사용할 이미지
                        alt="Github Dark"
                        width={24}
                        height={24}
                        className="hidden dark:block" // 다크 모드일 때 표시
                        priority
                    />
                </a>
                <a href="https://linkedin.com/in/재정-황-38ba49248" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                    <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition">
                    <Mail className="w-6 h-6" />
                </a>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} 잡다창고. All rights reserved.
            </p>
        </footer>
    );
}
