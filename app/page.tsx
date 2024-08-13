import HomeFinancials from "@/components/HomeFinancials";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getMetadata} from "@/lib/utils";
import LatestPosts from "@/components/post/LatestPosts";

const queryClient = new QueryClient();

export const metadata = getMetadata({title: '홈'});

export default function Home() {
    return (
        <div className="flex flex-col gap-6 w-full px-6 mx-auto max-w-7xl">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <HomeFinancials financialProductType={"SAVINGS"}/>
                    <HomeFinancials financialProductType={"INSTALLMENT_SAVINGS"}/>
                </div>
                <LatestPosts/>
            </HydrationBoundary>
        </div>
    );
}
