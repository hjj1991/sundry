import {cn} from '@/lib/utils';
import {Github, Linkedin, Mail} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function AuthorBio() {
    return (
        <div
            className={cn("mt-16 p-8 bg-card border rounded-lg shadow-sm flex flex-col items-center text-center")}>
            <Avatar className="h-[90px] w-[90px] mb-4">
                <AvatarImage src="/common/profile.jpeg"/>
                <AvatarFallback>JJ</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold text-foreground mb-2">
                황재정
            </h2>
            <p className="text-muted-foreground mb-4">
                백엔드 개발자로 일하고 있습니다.
            </p>
            <div className="flex space-x-4">
                <a href="mailto:hjj19911@naver.com" target="_blank" rel="noopener noreferrer">
                    <Mail
                        className="w-6 h-6 text-muted-foreground hover:text-primary transition"/>
                </a>
                <a href="https://github.com/hjj1991" target="_blank" rel="noopener noreferrer">
                    <Github
                        className="w-6 h-6 text-muted-foreground hover:text-primary transition"/>
                </a>
                <a href="https://linkedin.com/in/재정-황-38ba49248" target="_blank" rel="noopener noreferrer">
                    <Linkedin
                        className="w-6 h-6 text-muted-foreground hover:text-primary transition"/>
                </a>
            </div>
        </div>
    );
}
