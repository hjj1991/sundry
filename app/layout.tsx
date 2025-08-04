import type {Viewport} from "next";
import "./globals.css";
import Sidebar from "@/components/ui/header";
import MobileHeader from "@/components/ui/mobile-header";
import {cn, getMetadata} from "@/lib/utils";
import Providers from "@/app/utils/providers";
import Footer from "@/components/ui/footer";
import ScrollToTopAndShareButton from "@/components/ScrollToTopAndShareButton";
import {GoogleAnalytics} from '@next/third-parties/google'
import {ThemeProvider} from "@/components/ThemeProvider";
import {BlackHanSans, NotoSansKR} from "@/lib/fonts";

export const metadata = getMetadata();

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${NotoSansKR.variable} ${BlackHanSans.variable}`} suppressHydrationWarning>
        <body
            className={cn(
                "font-sans bg-background text-foreground",
                {"debug-screens": process.env.NODE_ENV === "development"}
            )}
        >
        <ThemeProvider>
            <MobileHeader />
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex">
                    <Sidebar />
                    <div className="flex-1 flex flex-col">
                        <Providers>
                            <main className="flex-1 pt-24 md:pt-8">
                                <div className="max-w-7xl mx-auto px-4 md:px-8">
                                    {children}
                                </div>
                            </main>
                        </Providers>
                        <Footer/>
                    </div>
                </div>
            </div>
            <ScrollToTopAndShareButton/>
        </ThemeProvider>
        {/* Google Analytics - Production 환경에서만 실행 */}
        {process.env.NODE_ENV === "production" && (
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_CODE as string}/>
        )}
        </body>
        </html>
    );
}
