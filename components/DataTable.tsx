"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {FinancialProduct, FinancialProductResponse, SearchParams} from "@/types/financials";
import FinancialProductCell from "@/components/FinancialProductCell";
import {useCallback, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {ArrowDown, ArrowUp} from "lucide-react";
import {CellContext} from "@tanstack/table-core";
import {useInfiniteQuery} from "@tanstack/react-query";

const columns = (depositPeriodMonths: string): ColumnDef<FinancialProduct>[] => [
    {
        accessorKey: "financialCompany.companyName",
        header: "회사명",
        enableSorting: true,
        enableMultiSort: true,
        id: "companyName",
    },
    {
        accessorKey: "financialProductName",
        header: "상품명",
        enableSorting: true,
        enableMultiSort: true,
        id: "financialProductName",
    },
    {
        accessorKey: "financialProductOptions",
        header: "기본 이율",
        cell: (props: CellContext<FinancialProduct, any>) => <FinancialProductCell {...props}
                                                                                   depositPeriodMonths={depositPeriodMonths}/>,
        id: "baseInterestRate",
    },
    {
        accessorKey: "financialProductOptions",
        header: "최고 우대 이율",
        cell: (props: CellContext<FinancialProduct, any>) => <FinancialProductCell {...props}
                                                                                   depositPeriodMonths={depositPeriodMonths}/>,
        id: "maximumInterestRate",
    },
];

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
    params.set('size', '20');
    const queryString = params.toString();
    const response = await fetch(`${process.env.API_SERVER_HOST}/v1/financials?${queryString}`, {
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

export function DataTable({searchParams}: { searchParams: SearchParams }) {
    const pathname = usePathname();
    const {replace} = useRouter();
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        error,
        isSuccess
    } = useInfiniteQuery({
        queryKey: [searchParams],
        queryFn: ({pageParam, queryKey}) => getFinancials(pageParam, queryKey),
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => firstPage.number > 0 ? firstPage.number - 1 : undefined,
        getNextPageParam: (lastPage) => !lastPage.last ? lastPage.number + 1 : undefined,
    });

    const [sorting, setSorting] = useState<SortingState>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [sortColumn, setSortColumn] = useState<'baseInterestRate' | 'maximumInterestRate' | null>(null);

    const table = useReactTable({
        data: data?.pages.flatMap(page => page.content) || [],
        columns: columns(searchParams.depositPeriodMonths || "0"),
        state: {sorting},
        onSortingChange: (updater) => {
            const newSortingInfo = updater instanceof Function ? updater(table.getState().sorting) : updater;
            setSorting(newSortingInfo);
            const params = new URLSearchParams(searchParams);
            params.delete('sort');
            newSortingInfo.forEach(sort => {
                params.append('sort', `${sort.id},${sort.desc ? 'desc' : 'asc'}`);
            });
            replace(`${pathname}?${params.toString()}`);
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount: data?.pages.length || 0,
        autoResetPageIndex: false,
        enableMultiSort: true,
    });

    const observer = useRef<IntersectionObserver | null>(null);

    const lastRowRef = useCallback((node: HTMLTableRowElement) => {
        if (isFetchingNextPage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage) {
                fetchNextPage();
            }
        }, {threshold: 0.1}); // Reduced threshold for larger screens
        if (node) observer.current.observe(node);
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleSort = (column: 'baseInterestRate' | 'maximumInterestRate') => {
        const newOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(newOrder);
        const params = new URLSearchParams(searchParams);
        params.delete('sort');
        params.set('sort', `${column},${newOrder}`);
        replace(`${pathname}?${params.toString()}`);
    };

    const handleResetSort = () => {
        setSortColumn(null);
        setSortOrder('asc');
        const params = new URLSearchParams(searchParams);
        params.delete('sort');
        replace(`${pathname}?${params.toString()}`);
    };

    if (!isSuccess) {
        return <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>;
    }
    if (error) {
        return <div className="p-4 text-center text-red-500 dark:text-red-400">Error: {error}</div>;
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
            {/* Sorting Buttons (Mobile only) */}
            <div className="block md:hidden mb-4">
                <Button
                    variant="outline"
                    onClick={() => handleSort('baseInterestRate')}
                    className={`mr-2 ${sortColumn === 'baseInterestRate' ? 'bg-teal-100 dark:bg-teal-700' : ''}`}
                >
                    기본 이율 {sortColumn === 'baseInterestRate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => handleSort('maximumInterestRate')}
                    className={`mr-2 ${sortColumn === 'maximumInterestRate' ? 'bg-teal-100 dark:bg-teal-700' : ''}`}
                >
                    최고 우대 이율 {sortColumn === 'maximumInterestRate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </Button>
                <Button
                    variant="outline"
                    onClick={handleResetSort}
                    className="mt-2"
                >
                    정렬 초기화
                </Button>
            </div>

            <Table className="w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
                <TableHeader className="hidden md:table-header-group">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isSorted = header.column.getIsSorted();
                                return (
                                    <TableHead key={header.id} colSpan={header.colSpan}
                                               className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-600">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={header.column.getCanSort()
                                                    ? 'select-none cursor-pointer flex items-center gap-1'
                                                    : ''}
                                                onClick={header.column.getToggleSortingHandler()}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                ) as React.ReactNode}
                                                {isSorted === 'asc' && (
                                                    <ArrowDown className="h-4 w-4 text-teal-700 dark:text-teal-300"/>
                                                )}
                                                {isSorted === 'desc' && (
                                                    <ArrowUp className="h-4 w-4 text-teal-700 dark:text-teal-300"/>
                                                )}
                                            </div>
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="block md:table-row-group">
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row, rowIndex) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={`block md:table-row border-b border-gray-300 dark:border-gray-600 rounded-lg mb-2 shadow-sm ${
                                    rowIndex % 2 === 0 ? 'bg-teal-50 dark:bg-teal-800' : 'bg-teal-100 dark:bg-teal-700'
                                } hover:shadow-md transition-shadow duration-200 ${
                                    rowIndex === table.getRowModel().rows.length - 1 ? 'rounded-b-lg' : ''
                                }`}
                                ref={rowIndex === table.getRowModel().rows.length - 1 ? lastRowRef : null}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id}
                                                   data-label={cell.column.columnDef.header}
                                                   className="block md:table-cell py-2 px-4 text-gray-800 dark:text-gray-300">
                                            <span
                                                className="block md:hidden font-semibold text-teal-700 dark:text-teal-300">
                                                {cell.column.columnDef.header as string}
                                            </span>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns(searchParams.depositPeriodMonths || "0").length}
                                       className="h-24 text-center text-gray-500 dark:text-gray-400">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
