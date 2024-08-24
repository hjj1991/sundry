import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import React from "react";
import PageTitle from "@/components/PageTitle";
import SearchField from "@/components/financial/SearchField";
import {SearchParams} from "@/types/financials";
import {DataTable} from "@/components/financial/DataTable";
import {getMetadata} from "@/lib/utils";

const queryClient = new QueryClient();

export default function FinancialsPage({searchParams}: { searchParams: SearchParams }) {
    return (
        <div className="flex flex-col gap-5 p-6 w-full max-w-screen-lg mx-auto">
            {/* 상위 컨테이너에 여백 및 최대 너비 적용 */}
            <PageTitle title="금융상품 조회"/>
            {/* PageTitle 컴포넌트에 하단 여백 추가 */}
            <SearchField/>
            {/* SearchField 컴포넌트에 하단 여백 추가 */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <DataTable searchParams={searchParams}/>
            </HydrationBoundary>
        </div>
    );
}

export const metadata = getMetadata({title: '금융 상품정보', asPath: '/financials'});