'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        <nav className="flex justify-center items-center space-x-2 mt-12" role="navigation" aria-label="Pagination">
            <Link
                href={createPageURL(currentPage - 1)}
                className={cn(
                    buttonVariants({ variant: 'outline' }),
                    "h-10 w-10 p-0",
                    currentPage <= 1 && "pointer-events-none opacity-50"
                )}
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
            >
                <span className="sr-only">Previous Page</span>
                <ChevronLeft className="h-5 w-5" />
            </Link>

            {pageNumbers.map((page) => (
                <Link
                    key={page}
                    href={createPageURL(page)}
                    className={cn(
                        buttonVariants({ variant: currentPage === page ? "default" : "outline" }),
                        "h-10 w-10"
                    )}
                    aria-current={currentPage === page ? "page" : undefined}
                >
                    {page}
                </Link>
            ))}

            <Link
                href={createPageURL(currentPage + 1)}
                className={cn(
                    buttonVariants({ variant: 'outline' }),
                    "h-10 w-10 p-0",
                    currentPage >= totalPages && "pointer-events-none opacity-50"
                )}
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
            >
                <span className="sr-only">Next Page</span>
                <ChevronRight className="h-5 w-5" />
            </Link>
        </nav>
    );
}
