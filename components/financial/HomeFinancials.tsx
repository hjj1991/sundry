"use client";

import {useQuery} from "@tanstack/react-query";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {FinancialProductResponse} from "@/types/financials";
import Link from "next/link";
import {List} from "lucide-react"; // lucide-react에서 List 아이콘을 가져옴



// Fetch Financial Data
const getFinancials = async (
    financialProductType: string
): Promise<FinancialProductResponse> => {
    const params = new URLSearchParams();
    params.set("page", "0");
    params.set("size", "10");
    params.set("financialProductType", financialProductType);
    params.set("depositPeriodMonths", "12");
    params.set("sort", "options.maxRate,desc");
    const response = await fetch(
        `${process.env.API_SERVER_HOST}/financial-products?${params.toString()}`,
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
    </div>
);

// Error Component
const ErrorComponent = ({message}: { message: string }) => (
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
    const {data, error, isLoading} = useQuery({
        queryKey: [financialProductType],
        queryFn: ({queryKey}) => getFinancials(queryKey[0]),
    });

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error.message}/>;
    }

    return (
        <div className="relative p-6 bg-card text-card-foreground rounded-lg shadow-lg">
            <Link
                href={`/financials?depositPeriodMonths=12&page=0&financialProductType=${financialProductType}`}
                className="absolute top-4 right-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
                <span className="hidden sm:inline">전체 목록</span>
                <List className="sm:hidden w-5 h-5"/>
            </Link>

            <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-3 text-foreground">
                    {financialProductType === "INSTALLMENT_SAVINGS"
                        ? "Top 10 적금"
                        : "Top 10 예금"}
                </div>
                <div className="text-sm text-muted-foreground space-y-1 mb-6">
                    <span className="inline-block bg-primary/10 text-primary py-1 px-2 rounded-md">12개월 기준</span>
                    <span className="inline-block bg-primary/10 text-primary py-1 px-2 rounded-md">최고 우대 이율 기준</span>
                </div>
            </div>

            <Table className="w-full border rounded-lg overflow-hidden shadow-md">
                <TableHeader>
                    <TableRow>
                        <TableHead
                            className="bg-muted/50 border-b">
                            회사명 / 상품명
                        </TableHead>
                        <TableHead
                            className="bg-muted/50 border-b">
                            기본 이율
                        </TableHead>
                        <TableHead
                            className="bg-muted/50 border-b">
                            최고 우대 이율
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item, index) => {
                        const twelveMonthOption = item.financialProductOptions.find(
                            (option) => option.depositPeriodMonths === "12"
                        );
                        const displayOption = twelveMonthOption || item.financialProductOptions[0];

                        return (
                            <TableRow key={index} className="hover:bg-muted/50">
                                <TableCell className="py-3 px-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-primary">
                                            {item.financialCompany.companyName}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {item.financialProductName}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    {displayOption.baseInterestRate}%
                                </TableCell>
                                <TableCell className="py-3 px-4">
                                    {displayOption.maximumInterestRate}%
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    {data?.content.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={3}
                                className="h-24 text-center text-muted-foreground"
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
