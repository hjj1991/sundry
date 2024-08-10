import PageTitle from "@/components/PageTitle";
import HomeFinancials from "@/components/HomeFinancials";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <HomeFinancials financialProductType={"SAVINGS"} />
                    <HomeFinancials financialProductType={"INSTALLMENT_SAVINGS"} />
                </div>
            </HydrationBoundary>
        </div>
    );
}
