'use client'
import React from 'react'
import { Nav } from './nav'
import {
    ChevronRight,
    LayoutDashboard,
    Settings,
    ShoppingCart,
    UsersRound,
} from "lucide-react"
import { Button } from './button'

import { useWindowWidth } from '@react-hook/window-size'

type Props = {}

export default function Sidebar({}: Props) {

    const [isCollapsed, setIsCollapsed] = React.useState(false)
    const [isClient, setIsClient] = React.useState(false)

    const onlyWidth = useWindowWidth()
    const mobileWidth = onlyWidth < 768

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    function toggleSidebar(){
        setIsCollapsed(!isCollapsed)
    }

    if (!isClient) {
        // 서버 사이드 렌더링 중에는 빈 div를 반환합니다.
        return <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'></div>
    }

    return (
        <div className='relative min-w-[80px] border-r px-3 pb-10 pt-24'>
            {!mobileWidth &&
                <div className='absolute right-[-20px] top-7'>
                    <Button variant='secondary' className='rounded-full p-2' onClick={toggleSidebar}>
                        <ChevronRight/>
                    </Button>
                </div>
            }
            <Nav
                isCollapsed={mobileWidth ? true : isCollapsed}
                links={[
                    {
                        title: "Financials",
                        href: "/financials",
                        icon: LayoutDashboard,
                        variant: "default",
                    },
                ]}
            />
        </div>
    )
}