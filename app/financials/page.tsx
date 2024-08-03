import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";


import React from "react";
import PageTitle from "@/components/PageTitle";
import SearchField from "@/components/SearchField";
import {SearchParams} from "@/types/financials";
import {DataTable} from "@/components/DataTable2";
import {getMetadata} from "@/lib/utils";

const queryClient = new QueryClient();

export default function FinancialsPage({searchParams}: { searchParams: SearchParams }) {
    return (
        <div className="flex flex-col gap-5  w-full">
            <PageTitle title="금융상품 조회"/>
            <SearchField/>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <DataTable searchParams={searchParams}/>
            </HydrationBoundary>
        </div>
    );
}

export const metadata = getMetadata({title: '금융 상품정보', asPath: '/financials'});
