'use client';
import React from 'react';
import {Nav} from './nav';
import {LayoutDashboard, MessageCircle, Moon, StickyNote, Sun} from 'lucide-react';
import Link from 'next/link';
import {useTheme} from 'next-themes';
import {Button} from "@/components/ui/button";

export default function Sidebar() {
    const {theme, setTheme} = useTheme();

    const toggleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const navLinks = [
        {
            title: "Financials",
            href: "/financials",
            icon: LayoutDashboard,
            variant: "default" as const,
        },
        {
            title: "Posts",
            href: "/posts",
            icon: StickyNote,
            variant: "default" as const,
        },
        {
            title: "AI Chat",
            href: "/ai-chat",
            icon: MessageCircle,
            variant: "default" as const,
        },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 h-screen p-4 border-r bg-background sticky top-0">
            <div className="text-2xl font-bold font-heading mb-8">
                <Link href="/">잡다창고</Link>
            </div>
            <Nav isCollapsed={false} links={navLinks}/>
            <div className="mt-auto">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="w-full justify-start">
                    {theme === 'dark' ? <Sun className="w-5 h-5 mr-2"/> : <Moon className="w-5 h-5 mr-2"/>}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </Button>
            </div>
        </aside>
    );
}