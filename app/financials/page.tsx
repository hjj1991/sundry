export const runtime = 'edge';  // Edge Runtime 설정 추가

import { DataTable } from "@/components/DataTable";
import React, {Suspense} from "react";
import PageTitle from "@/components/PageTitle";
import SearchField from "@/components/SearchField";
import {SearchParams} from "@/types/financials";

export default function FinancialsPage({searchParams}: {searchParams: SearchParams}) {
    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="예,적금 상품 조회" />
            <SearchField  />
            <Suspense fallback={<div></div>}>
            <DataTable searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
