import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {GenerateMetadataProps} from "@/types/common";
import {META} from "@/constants/metadata";
import {Metadata} from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  // ISO 8601 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 날짜와 시간을 포맷팅
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
}


export function encodeUriComponentSafe(str: string): string {
  return encodeURIComponent(str).replace(
      /[!'()*]/g,
      (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

export function decodeUriComponentSafe(uriComponent: string): string {
  try {
    return decodeURIComponent(uriComponent);
  } catch (e) {
    return uriComponent;
  }
}

export function doubleDecodeUriComponent(uriComponent: string): string {
  return decodeUriComponentSafe(decodeUriComponentSafe(uriComponent));
}

export const getMetadata = (metadataProps?: GenerateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | 잡다창고` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? asPath : '';
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: PAGE_URL,
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: TITLE,
      locale: 'ko_KR',
      type: 'website',
      url: PAGE_URL,
      images: {
        url: OG_IMAGE,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
    verification: {
      other:{
        'naver-site-verification':'30269204ac0ff12915db3c613144b4b38f385a06'
      }
    },
  };

  return metadata;
};

export function getHeadingsFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings: Array<{ id: string; text: string }> = [];

  doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
    const id = heading.id;
    const text = heading.textContent || '';
    if (id) {
      headings.push({ id, text });
    }
  });

  return headings;
}