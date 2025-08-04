'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Pagination({ totalPages, currentPage }: { totalPages: number, currentPage: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center items-center space-x-2 mt-8">
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage <= 1}
                asChild
            >
                <Link href={createPageURL(currentPage - 1)} aria-disabled={currentPage <= 1}>
                    이전
                </Link>
            </Button>
            {pageNumbers.map((page) => (
                <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    asChild
                >
                    <Link href={createPageURL(page)}>{page}</Link>
                </Button>
            ))}
            <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage >= totalPages}
                asChild
            >
                <Link href={createPageURL(currentPage + 1)} aria-disabled={currentPage >= totalPages}>
                    다음
                </Link>
            </Button>
        </div>
    );
}
