import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/header";
import {cn} from "@/lib/utils";
import Providers from "@/app/utils/providers";
import {META} from "@/constants/metadata";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="font-jalnan">
      <body
          className={cn(
              {"debug-screens": process.env.NODE_ENV === "development"}
          )}
      >
      {/* Header */}
      <Header/>
      {/* main page */}
      <Providers>
          <main className="flex-1 pt-24 px-4 sm:px-8"> {/* pt-16으로 헤더의 높이만큼 패딩 추가 */}
              {children}
          </main>
      </Providers>
      </body>
    </html>
  );
}
