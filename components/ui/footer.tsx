// components/ui/footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-footer-background text-footer-text py-1 px-6 text-center">
            <p className="text-sm">
                이 페이지에는 ㈜여기어때컴퍼니가 제공한 <strong>여기어때 잘난체</strong>가 적용되어 있습니다.
            </p>
            <p className="text-sm">
                라이센스 정보는 <Link href="/licenses" className="text-blue-500 hover:underline">여기</Link>에서 확인하실 수 있습니다.
            </p>
            <p className="text-sm mt-2">
                &copy; {new Date().getFullYear()} 잡다창고. All rights reserved.
            </p>
        </footer>
    );
}
