'use client'; // 클라이언트 컴포넌트로 지정

import {any} from "prop-types";

// @ts-ignore
export default function FinancialProductCell({ row }) {
    const options = row.original.financialProductOptions;
    const maxInterestRate = options && options.length > 0 ? options[0].maximumInterestRate : "N/A";

    return (
        <div>
            {maxInterestRate}
        </div>
    );
}