"use client";

import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FinancialProductResponse } from "@/types/financials";
import Link from "next/link";

// Fetch Financial Data
const getFinancials = async (
    financialProductType: string
): Promise<FinancialProductResponse> => {
    const params = new URLSearchParams();
    params.set("page", "0");
    params.set("size", "10");
    params.set("financialProductType", financialProductType);
    params.set("depositPeriodMonths", "12");
    params.set("sort", "maximumInterestRate,desc");
    const response = await fetch(
        `${process.env.API_SERVER_HOST}/v1/financials?${params.toString()}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-cache",
        }
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-500"></div>
    </div>
);

// Error Component
const ErrorComponent = ({ message }: { message: string }) => (
    <div className="p-4 text-center text-red-500 dark:text-red-400">
        Error: {message}
    </div>
);

// DataTable Component
export default function HomeFinancials({
                                           financialProductType,
                                       }: {
    financialProductType: string;
}) {
    const { data, error, isLoading } = useQuery({
        queryKey: [financialProductType],
        queryFn: ({ queryKey }) => getFinancials(queryKey[0]),
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <ErrorComponent message={error.message} />;
    }

    return (
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">
                    {financialProductType === "INSTALLMENT_SAVINGS"
                        ? "Top 10 적금"
                        : "Top 10 예금"}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 mb-6">
                    <span className="inline-block bg-yellow-100 text-yellow-800 py-1 px-2 rounded-md">12개월 기준</span>
                    <span className="inline-block bg-green-100 text-green-800 py-1 px-2 rounded-md">최고 우대 이율 기준</span>
                </div>
            </div>

            <Link
                href={`/financials?depositPeriodMonths=12&page=0&financialProductType=${financialProductType}`}
                className="block md:absolute md:top-4 md:right-4 inline-flex items-center px-4 py-2 mb-4 md:mb-0 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition duration-150 ease-in-out"
            >
                전체 목록
            </Link>

            <Table className="w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-700">
                            회사명 / 상품명
                        </TableHead>
                        <TableHead
                            className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-700">
                            기본 이율
                        </TableHead>
                        <TableHead
                            className="bg-teal-100 dark:bg-teal-700 text-teal-700 dark:text-teal-300 border-b border-gray-300 dark:border-gray-700">
                            최고 우대 이율
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item, index) => (
                        <TableRow key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                            <TableCell className="py-3 px-4 text-gray-800 dark:text-gray-300">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                        {item.financialCompany.companyName}
                                    </span>
                                    <span className="text-gray-600 dark:text-gray-400">
                                        {item.financialProductName}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="py-3 px-4 text-gray-800 dark:text-gray-300">
                                {item.financialProductOptions[0].baseInterestRate}%
                            </TableCell>
                            <TableCell className="py-3 px-4 text-gray-800 dark:text-gray-300">
                                {item.financialProductOptions[0].maximumInterestRate}%
                            </TableCell>
                        </TableRow>
                    ))}
                    {data?.content.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="h-24 text-center text-gray-500 dark:text-gray-400"
                            >
                                결과가 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
