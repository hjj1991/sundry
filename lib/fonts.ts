import { IBM_Plex_Sans_KR, Black_Han_Sans } from 'next/font/google';

export const IBMPlexSansKR = IBM_Plex_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans-kr',
  display: 'swap',
});

export const BlackHanSans = Black_Han_Sans({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-black-han-sans',
  display: 'swap',
});
