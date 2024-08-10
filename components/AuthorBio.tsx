import Image from 'next/image';
import {cn} from '@/lib/utils';
import {Linkedin, Mail} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function AuthorBio() {
    return (
        <div
            className={cn("mt-16 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center text-center")}>
            <Avatar className="h-[90px] w-[90px]">
                <AvatarImage src="/common/profile.jpeg"/>
                <AvatarFallback>JJ</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                황재정
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                백엔드 개발자로 일하고 있습니다.
            </p>
            <div className="flex space-x-4">
                <a href="mailto:hjj19911@naver.com" target="_blank" rel="noopener noreferrer">
                    <Mail
                        className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"/>
                </a>
                <a href="https://github.com/hjj1991" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/common/github-mark.png"
                        alt="Github"
                        width={24}
                        height={24}
                        className="block dark:hidden" // 다크 모드가 아닐 때 표시
                    />
                    <Image
                        src="/common/github-mark-white.png" // 다크 모드일 때 사용할 이미지
                        alt="Github Dark"
                        width={24}
                        height={24}
                        className="hidden dark:block" // 다크 모드일 때 표시
                    />
                </a>
                <a href="https://linkedin.com/in/재정-황-38ba49248" target="_blank" rel="noopener noreferrer">
                    <Linkedin
                        className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"/>
                </a>
            </div>
        </div>
    );
}
