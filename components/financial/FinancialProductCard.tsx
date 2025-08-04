'use client'

import { FinancialProduct } from "@/types/financials";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface FinancialProductCardProps {
    product: FinancialProduct;
    onShowDetails: (product: FinancialProduct) => void;
}

export default function FinancialProductCard({ product, onShowDetails }: FinancialProductCardProps) {
    const highestRate = product.financialProductOptions.reduce((max, option) => Math.max(max, option.maximumInterestRate), 0);

    return (
        <Card className="flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
            <CardHeader>
                <div>
                    <CardTitle className="text-lg font-bold">{product.financialProductName}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.financialCompany.companyName}</p>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex justify-between items-center">
                    <span className="text-sm">최고 연</span>
                    <span className="text-2xl font-bold text-primary">{highestRate.toFixed(2)}%</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {product.joinWay && product.joinWay.split(",").map(way => <Badge key={way} variant="secondary">{way}</Badge>)}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => onShowDetails(product)} className="w-full">상세보기</Button>
            </CardFooter>
        </Card>
    );
}
