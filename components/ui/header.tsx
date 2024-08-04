'use client';
import React, { useState } from 'react';
import { Nav } from './nav';
import { LayoutDashboard, Menu, StickyNote, Moon, Sun } from 'lucide-react';
import { useWindowWidth } from '@react-hook/window-size';
import Link from "next/link";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    function toggleDarkMode() {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark', !isDarkMode);
    }

    return (
        <>
            {/* Header */}
            <header className={`fixed top-0 left-0 w-full p-4 flex items-center z-40 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
                <Menu
                    onClick={toggleSidebar}
                    className={`hover:${isDarkMode ? 'bg-yellow-500' : 'bg-yellow-300'} mr-4 cursor-pointer transition-colors`}
                />
                <h1 className="text-xl font-bold">
                    <Link href="/">잡다창고</Link>
                </h1>
                <button onClick={toggleDarkMode} className="ml-auto p-2 transition-colors">
                    {isDarkMode ? <Sun className="w-6 h-6 text-yellow-500"/> : <Moon className="w-6 h-6 text-gray-600"/>}
                </button>
            </header>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-30" onClick={closeSidebar}>
                    <div
                        className={`absolute top-0 left-0 h-full bg-opacity-90 p-4 transition-transform duration-300 ease-in-out ${
                            isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-800'
                        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${
                            mobileWidth ? 'w-16' : 'w-52'
                        }`}
                        style={{ top: '3rem' }} // Adjust for header height
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Nav
                            isCollapsed={mobileWidth ? true : !isSidebarOpen}
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
