'use client';
import React, {useState} from 'react';
import {Menu, Moon, Sun, X} from 'lucide-react';
import Link from 'next/link';
import {useTheme} from 'next-themes';
import {Button} from "@/components/ui/button";
import {Nav} from "@/components/ui/nav";
import {LayoutDashboard, StickyNote} from "lucide-react";

export default function MobileHeader() {
    const {theme, setTheme} = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

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
    ];

    return (
        <>
            {/* Mobile Header */}
            <header
                className="md:hidden fixed top-0 left-0 w-full p-4 flex items-center z-50 border-b bg-background/80 backdrop-blur-lg">
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <Menu className="h-6 w-6"/>
                </Button>
                <div className="text-xl font-bold font-heading ml-4">
                    <Link href="/">잡다창고</Link>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="ml-auto">
                    {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-500"/> : <Moon className="w-6 h-6"/>}
                </Button>
            </header>

            {/* Mobile Sidebar */}
            <div
                className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            >
                <div
                    className={`fixed top-0 left-0 h-full bg-background p-4 transition-transform duration-300 ease-in-out w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-xl font-bold font-heading">
                            <Link href="/" onClick={closeSidebar}>잡다창고</Link>
                        </div>
                        <Button variant="ghost" size="icon" onClick={closeSidebar}>
                            <X className="h-6 w-6"/>
                        </Button>
                    </div>
                    <Nav isCollapsed={false} links={navLinks}/>
                </div>
            </div>
        </>
    );
}
