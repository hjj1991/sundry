import { BlackHanSans, IBMPlexSansKR } from "@/lib/fonts";
import type { Viewport } from "next";
import "./globals.css";
import { cn, getMetadata } from "@/lib/utils";
import { GoogleAnalytics } from '@next/third-parties/google';
import ClientProviders from "@/components/ClientProviders";

export const metadata = getMetadata();

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${IBMPlexSansKR.variable} ${BlackHanSans.variable}`} suppressHydrationWarning>
        <body
            className={cn(
                "font-sans bg-background text-foreground",
                { "debug-screens": process.env.NODE_ENV === "development" }
            )}
        >
        <ClientProviders>{children}</ClientProviders>
        {/* Google Analytics - Production 환경에서만 실행 */}
        {process.env.NODE_ENV === "production" && (
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_CODE as string} />
        )}
        </body>
        </html>
    );
}
