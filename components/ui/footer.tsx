import React from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="p-6 text-center border-t bg-background">
            <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} 잡다창고. All rights reserved.
                </p>
                <div className="flex items-center space-x-4">
                    <a href="https://github.com/hjj1991" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/재정-황-38ba49248" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:your.email@example.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
                라이센스 정보는 <Link href="/licenses" className="hover:underline">여기</Link>에서 확인하실 수 있습니다.
            </p>
        </footer>
    );
}
