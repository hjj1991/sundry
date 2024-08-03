import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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