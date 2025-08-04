'use client'

import { FinancialProduct, FinancialProductResponse, SearchParams } from "@/types/financials";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FinancialProductModal } from "@/components/financial/FinancialProductModal";
import FinancialProductCard from "@/components/financial/FinancialProductCard";
import {usePathname, useRouter} from "next/navigation";

// Fetch Financial Data
const getFinancials = async (pageParam = 0, queryKey: SearchParams[]): Promise<FinancialProductResponse> => {
    const params = new URLSearchParams();
    Object.entries(queryKey[0]).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(val => params.append(key, val));
        } else {
            params.set(key, value);
        }
    });
    params.set('page', pageParam.toString());
    params.set('size', '20'); // Adjust page size for a card layout
    const queryString = params.toString();
    const response = await fetch(`${process.env.API_SERVER_HOST}/financial-products?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Fetch specific financial product details
const getFinancialProductById = async (financialProductId: string): Promise<FinancialProduct> => {
    const response = await fetch(`${process.env.API_SERVER_HOST}/financial-products/${financialProductId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Helper function to exclude financialProductId from searchParams
const filterSearchParams = (params: SearchParams) => {
    const { financialProductId, ...rest } = params;
    return rest;
};

// Skeleton Loader Component
export function SkeletonLoader({ count }: { count: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="animate-pulse bg-muted rounded-lg p-4 space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-muted-foreground/20"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 bg-muted-foreground/20 rounded w-3/4"></div>
                            <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
                        </div>
                    </div>
                    <div className="h-8 bg-muted-foreground/20 rounded w-full"></div>
                    <div className="h-10 bg-muted-foreground/20 rounded w-full"></div>
                </div>
            ))}
        </div>
    );
}

// Error Component
const ErrorComponent = ({ message }: { message: string }) => (
    <div className="p-4 text-center text-destructive">
        Error: {message}
    </div>
);

// DataTable Component
export function DataTable({ searchParams }: { searchParams: SearchParams }) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
        isLoading
    } = useInfiniteQuery({
        queryKey: [filterSearchParams(searchParams)],
        queryFn: ({ pageParam, queryKey }) => getFinancials(pageParam, [{ ...queryKey[0], financialProductId: '' }]),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => !lastPage.last ? lastPage.number + 1 : undefined,
    });

    const [selectedProduct, setSelectedProduct] = useState<FinancialProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            if (searchParams.financialProductId && searchParams.financialProductId !== "") {
                try {
                    const product = await getFinancialProductById(searchParams.financialProductId);
                    setSelectedProduct(product);
                    setIsModalOpen(true);
                } catch (e) {
                    console.error("Failed to fetch product details:", e);
                    // API 호출 실패 시 모달을 닫고 URL을 리셋하는 로직을 제거합니다.
                    // setIsModalOpen(false);
                    // replace(`${pathname}?${new URLSearchParams(searchParams).toString().replace(/financialProductId=[^&]*/, '')}`, { scroll: false });
                }
            }
        };
        fetchProduct();
    }, [searchParams.financialProductId]);

    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback((node: HTMLDivElement) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        }, { threshold: 0.5 });
        if (node) observer.current.observe(node);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleShowDetails = (product: FinancialProduct) => {
        setSelectedProduct(product);
        const params = new URLSearchParams(searchParams);
        params.set('financialProductId', product.financialProductId.toString());
        setIsModalOpen(true);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleCloseModal = () => {
        const params = new URLSearchParams(searchParams);
        params.delete('financialProductId');
        setIsModalOpen(false);
        replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    if (isLoading) {
        return <SkeletonLoader count={20} />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    const allProducts = data?.pages.flatMap(page => page.content) || [];

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.map((product, index) => {
                    if (index === allProducts.length - 1) {
                        return (
                            <div ref={lastElementRef} key={product.financialProductId}>
                                <FinancialProductCard product={product} onShowDetails={handleShowDetails} />
                            </div>
                        );
                    }
                    return <FinancialProductCard key={product.financialProductId} product={product} onShowDetails={handleShowDetails} />;
                })}
            </div>

            {isFetchingNextPage && <SkeletonLoader count={4} />}

            {!hasNextPage && allProducts.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    <p>검색 결과가 없습니다.</p>
                </div>
            )}

            {selectedProduct && (
                <FinancialProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    data={selectedProduct}
                />
            )}
        </div>
    );
}
