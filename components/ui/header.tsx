'use client';
import React, { useState } from 'react';
import { Nav } from './nav';
import { LayoutDashboard, Menu, StickyNote } from 'lucide-react';
import { useWindowWidth } from '@react-hook/window-size';
import Link from "next/link";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    function closeSidebar() {
        setIsSidebarOpen(false);
    }

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center z-40">
                <Menu
                    onClick={toggleSidebar}
                    className="hover:bg-yellow-500 mr-4 cursor-pointer"
                />
                <h1 className="text-xl font-bold">
                    <Link href="/">잡다창고</Link>
                </h1>
            </header>

            {/* Sidebar */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-30" onClick={closeSidebar}>
                    <div
                        className={`absolute top-0 left-0 h-full bg-gray-900 bg-opacity-55 text-white p-4 transition-transform duration-300 ease-in-out ${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        } ${mobileWidth ? 'w-16' : 'w-52'}`}
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
