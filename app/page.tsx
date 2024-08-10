import PageTitle from "@/components/PageTitle";
import HomeFinancials from "@/components/HomeFinancials";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";


const queryClient = new QueryClient();


export default function Home() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <HomeFinancials financialProductType={"SAVINGS"} />
                <HomeFinancials financialProductType={"INSTALLMENT_SAVINGS"} />
            </HydrationBoundary>
        </div>
    )
}