'use client';
import React, { useState } from 'react';
import { Nav } from './nav';
import { LayoutDashboard, StickyNote } from 'lucide-react';
import { Button } from './button';
import { useWindowWidth } from '@react-hook/window-size';

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const onlyWidth = useWindowWidth();
    const mobileWidth = onlyWidth < 768;

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
            {/* Header */}
            <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex items-center justify-between z-40">
                <Button
                    onClick={toggleSidebar}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                >
                    Open Sidebar
                </Button>
                <h1 className="text-xl font-bold">My App</h1>
            </header>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-gray-900 bg-opacity-80 text-white p-4 transition-transform duration-300 ease-in-out z-30 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } ${mobileWidth ? 'w-16' : 'w-52'}`}
                style={{ top: '4rem' }} // Adjust for header height
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
        </>
    );
}
