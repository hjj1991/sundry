import { Black_Han_Sans, Noto_Sans_KR } from "next/font/google";

export const NotoSansKR = Noto_Sans_KR({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-sans",
});

export const BlackHanSans = Black_Han_Sans({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-heading",
});