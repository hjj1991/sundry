import type {Viewport} from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import {cn, getMetadata} from "@/lib/utils";
import Providers from "@/app/utils/providers";
import Footer from "@/components/ui/footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import {GoogleAnalytics} from '@next/third-parties/google'
import {ThemeProvider} from "@/components/ThemeProvider";

export const metadata = getMetadata();

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="font-jalnan" suppressHydrationWarning>
        <body
            className={cn(
                "bg-white dark:bg-gray-900 dark:text-gray-100", // 기본 모드와 다크 모드 배경 및 텍스트 색상
                {"debug-screens": process.env.NODE_ENV === "development"}
            )}
        >
        <ThemeProvider>
        {/* Header */}
        <Header/>
        {/* main page */}
        <Providers>
            <main className="flex-1 pt-24">
                {children}
            </main>
        </Providers>
        <Footer/>
        <ScrollToTopButton/>
        {/* Google Analytics - Production 환경에서만 실행 */}
        {process.env.NODE_ENV === "production" && (
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_CODE as string}/>
        )}
        </ThemeProvider>
        </body>
        </html>
    );
}
