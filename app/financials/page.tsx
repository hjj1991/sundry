import {dehydrate, HydrationBoundary, QueryClient, QueryClientProvider} from "@tanstack/react-query";


import React, {Suspense} from "react";
import PageTitle from "@/components/PageTitle";
import SearchField from "@/components/SearchField";
import {SearchParams} from "@/types/financials";
import {DataTable} from "@/components/DataTable2";

const queryClient = new QueryClient();

export default function FinancialsPage({searchParams}: {searchParams: SearchParams}) {
    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="예,적금 상품 조회" />
            <SearchField  />
            <HydrationBoundary state={dehydrate(queryClient)}>
            <DataTable searchParams={searchParams} />
            </HydrationBoundary>
        </div>
    );
}
