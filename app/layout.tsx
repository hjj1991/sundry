import type {Metadata} from "next";
import "./globals.css";
import Header from "@/components/ui/header";
import {cn} from "@/lib/utils";
import Providers from "@/app/utils/providers";
import {META} from "@/constants/metadata";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
    title: META.title,
    description: META.description,
};

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className="font-jalnan">
        <body
            className={cn(
                "bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100", // 기본 모드와 다크 모드 배경 및 텍스트 색상
                {"debug-screens": process.env.NODE_ENV === "development"}
            )}
        >
        {/* Header */}
        <Header/>
        {/* main page */}
        <Providers>
            <main className="flex-1 pt-24">
                {children}
            </main>
        </Providers>
        <Footer/>
        </body>
        </html>
    );
}
