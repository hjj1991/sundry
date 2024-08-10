"use client";
import {useQuery} from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FinancialProduct, FinancialProductResponse, SearchParams } from "@/types/financials";
import FinancialProductCell from "@/components/FinancialProductCell";
import {ColumnDef} from "@tanstack/react-table";
import {CellContext} from "@tanstack/table-core";


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

// Fetch Financial Data
const getFinancials = async (financialProductType: string): Promise<FinancialProductResponse> => {
    const params = new URLSearchParams();
    params.set('page', '0');
    params.set('size', '10');
    params.set('type', financialProductType);
    params.set('depositPeriodMonths', '12');
    params.set('sort', 'maximumInterestRate,desc');
    const response = await fetch(`${process.env.API_SERVER_HOST}/v1/financials?${params.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-cache",
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
    </div>
);

// Error Component
const ErrorComponent = ({ message }: { message: string }) => (
    <div className="p-4 text-center text-red-500 dark:text-red-400">
        Error: {message}
    </div>
);

// DataTable Component
export default function HomeFinancials({financialProductType}: { financialProductType: string }) {
    const {
        data,
        error,
        isLoading
    } = useQuery({
        queryKey: [financialProductType],
        queryFn: ({queryKey}) => getFinancials(queryKey[0]),
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{financialProductType === 'INSTALLMENT_SAVINGS' ? 'Top 10 적금' : 'Top 10 예금'}</h1>
            <Table className="w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-600">회사명</TableHead>
                        <TableHead className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-600">상품명</TableHead>
                        <TableHead className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-600">기본 이율</TableHead>
                        <TableHead className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-600">최고 우대 이율</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item, index) => (
                        <TableRow
                            key={index}
                        >
                            <TableCell className="py-2 px-4 text-gray-800 dark:text-gray-300">{item.financialCompany.companyName}</TableCell>
                            <TableCell className="py-2 px-4 text-gray-800 dark:text-gray-300">{item.financialProductName}</TableCell>
                            <TableCell className="py-2 px-4 text-gray-800 dark:text-gray-300">{item.financialProductOptions[0].baseInterestRate}</TableCell>
                            <TableCell className="py-2 px-4 text-gray-800 dark:text-gray-300">{item.financialProductOptions[0].maximumInterestRate}</TableCell>
                        </TableRow>
                    ))}
                    {data?.content.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center text-gray-500 dark:text-gray-400">
                                결과가 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
