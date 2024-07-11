"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import {FinancialProduct, SearchParams} from "@/types/financials";
import FinancialProductCell from "@/components/FinancialProductCell";
import {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const columns: ColumnDef<FinancialProduct>[] = [
    {
        accessorKey: "financialCompany.companyName",
        header: "회사명"
    },
    {
        accessorKey: "financialProductName",
        header: "상품명"
    },
    // {
    //     accessorKey: "financialProductOptions[0].baseInterestRate",
    //     header: "기본 이율"
    // },
    {
        accessorKey: "financialProductOptions",
        header: "최고 우대 이율",
        cell: FinancialProductCell
    },
];

async function getFinancials(searchParams: SearchParams) {
    // URLSearchParams 객체를 사용하여 쿼리 파라미터 생성
    const queryString = new URLSearchParams(searchParams).toString();
    const res = await fetch(`http://localhost:8080/v1/financials?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        cache: "no-cache"
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export function DataTable({searchParams}: {searchParams:SearchParams}) {
    const pathname = usePathname();
    const { replace } = useRouter();
    const [data, setData] = useState<FinancialProduct[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [pageCount, setPageCount] = useState(-1);
    const [pagination, setPagination] = useState({
        pageIndex: Number(searchParams.page || '0'),
        pageSize: 20, //default page size
    });


    useEffect(() => {
        getFinancials(searchParams).then(value => {
            setData(value.content)
            setPageCount(value.last === true ? 0 : -1)
            setPagination({pageIndex: value.number, pageSize: value.size})
            setLoading(false)
        })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [searchParams])

    useEffect(() => {
        console.log('ahahthr')
    }, [pagination])

    const table = useReactTable({
        data,
        columns,
        state: {pagination},
        onPaginationChange: (updater) => {
            // make sure updater is callable (to avoid typescript warning)
            if (typeof updater !== "function") return;
            const newPageInfo = updater(table.getState().pagination);
            setPagination(newPageInfo)
            const params = new URLSearchParams(searchParams)
            params.set('page', newPageInfo.pageIndex.toString())
            params.set('size', newPageInfo.pageSize.toString())
            replace(`${pathname}?${params.toString()}`)
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        pageCount: pageCount,
        autoResetPageIndex: false,
    })

    function handlePreviousButton() {
        const params = new URLSearchParams(searchParams);
        setPagination({pageIndex: pagination.pageIndex - 1, pageSize: pagination.pageSize});
        params.set('page', pagination.pageIndex.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    function handleNextButton() {
        const params = new URLSearchParams(searchParams);
        setPagination({pageIndex: pagination.pageIndex + 1, pageSize: pagination.pageSize});
        // params.set('page', pagination.pageIndex.toString());
        // replace(`${pathname}?${params.toString()}`);
    }


    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }


    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()} // Disable Previous button if on the first page
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        console.log('aaa')
                        table.nextPage()
                    }}
                    disabled={!table.getCanNextPage()} // Disable Next button if on the last page
                >
                    Next
                </Button>
            </div>
        </div>
    )
}