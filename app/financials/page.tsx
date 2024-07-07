/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/**
 * eslint-disable @next/next/no-img-element
 *
 * @format
 */

/** @format */

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import FinancialProductCell from "@/components/FinancialProductCell";
import {FinancialProduct, FinancialProductResponse} from "@/types/financials";

type Props = {};


const columns: ColumnDef<FinancialProduct>[] = [
    {
        accessorKey: "financialCompany.companyName",
        header: "회사명"
    },
    {
        accessorKey: "financialProductName",
        header: "상품명"
    },
    {
        accessorKey: "financialProductOptions.[0].baseInterestRate",
        header: "기본 이율"
    },
    {
        accessorKey: "financialProductOptions",
        header: "최고 우대 이율",
        cell: FinancialProductCell
    },
];


async function getFinancials(params = {}) {
    // URLSearchParams 객체를 사용하여 쿼리 파라미터 생성
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`http://localhost:8080/v1/financials?${queryString}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function FinancialsPage({}: Props) {
    const data: FinancialProductResponse = await getFinancials()
    console.log(data)
    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="Orders" />
            <DataTable columns={columns} data={data.content} />
        </div>
    );
}