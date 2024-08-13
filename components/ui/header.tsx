'use client';
import React, {useEffect, useState} from 'react';
import {Nav} from './nav';
import {LayoutDashboard, Menu, Moon, StickyNote, Sun} from 'lucide-react';
import Link from 'next/link';
import {useTheme} from 'next-themes';

export default function Header() {
    const {theme, setTheme} = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [mounted, setMounted] = useState(false); // 추가된 상태

    useEffect(() => {
        setMounted(true); // 컴포넌트가 마운트된 후 상태를 업데이트
    }, []);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    function toggleDarkMode() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    if (!mounted) return null; // 컴포넌트가 클라이언트에서만 렌더링되도록 함

    return (
        <>
            {/* Header */}
            <header className={`fixed top-0 left-0 w-full p-4 flex items-center z-40 transition-colors duration-300 ${
                theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
                <Menu
                    onClick={toggleSidebar}
                    className={`hover:${theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-300'} mr-4 cursor-pointer transition-colors`}
                />
                <div className="text-xl font-bold">
                    <Link href="/">잡다창고</Link>
                </div>
                <button onClick={toggleDarkMode} className="ml-auto p-2 transition-colors">
                    {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-500"/> :
                        <Moon className="w-6 h-6 text-gray-600"/>}
                </button>
            </header>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-30" onClick={closeSidebar}>
                    <div
                        className={`absolute top-0 left-0 h-full bg-opacity-90 p-4 transition-transform duration-300 ease-in-out ${
                            theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 'w-52'`}
                        style={{top: '3rem'}} // Adjust for header height
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Nav
                            isCollapsed={false}
                            links={[
                                {
                                    title: "Financials",
                                    href: "/financials",
                                    icon: LayoutDashboard,
                                    variant: "default",
                                },
                                {
                                    title: "Posts",
                                    href: "/posts",
                                    icon: StickyNote,
                                    variant: "default",
                                },
                            ]}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
