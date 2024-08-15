'use client';

import { CellContext } from "@tanstack/table-core";
import { FinancialProduct } from "@/types/financials";

interface FinancialProductCellProps extends CellContext<FinancialProduct, any> {
    depositPeriodMonths: string;
}

export default function FinancialProductCell({ row, column, depositPeriodMonths }: FinancialProductCellProps) {
    const options = row.original.financialProductOptions;
    let matchingOption;

    if (depositPeriodMonths === '0') {
        matchingOption = options.reduce((prev, current) => {
            const prevRate = prev.baseInterestRate ?? 0;
            const currentRate = current.baseInterestRate ?? 0;
            return prevRate > currentRate ? prev : current;
        }, options[0]);
    } else {
        matchingOption = options.find(option => option.depositPeriodMonths === depositPeriodMonths);
    }

    if (!matchingOption) {
        return <div>N/A</div>;
    }

    const value = column.id === 'maximumInterestRate'
        ? matchingOption.maximumInterestRate ?? "N/A"
        : column.id === 'baseInterestRate'
            ? matchingOption.baseInterestRate ?? "N/A"
            : "N/A";

    return (
        <div>
            {value} ({matchingOption.depositPeriodMonths} 개월)
        </div>
    );
}
