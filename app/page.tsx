import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getMetadata} from "@/lib/utils";
import LatestPosts from "@/components/post/LatestPosts";
import PageTitle from "@/components/PageTitle";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import HomeFinancials from "@/components/financial/HomeFinancials";

const queryClient = new QueryClient();

export const metadata = getMetadata({title: '홈'});

export default function Home() {
    return (
        <div className="flex flex-col gap-20 w-full mx-auto max-w-7xl px-6">
            {/* Hero Section */}
            <section className="text-center py-20">
                <PageTitle
                    title="탐구하고, 공유하고, 성장하는 공간"
                    description="기술, 독서, 그리고 일상의 기록들을 담아냅니다."
                    classname="font-heading"
                />
                <div className="mt-8">
                    <Link href="/posts">
                        <Button size="lg">최신 포스트 보러가기</Button>
                    </Link>
                </div>
            </section>

            {/* Interactive Financials Section */}
            <section>
                <PageTitle title="나에게 맞는 금융 상품 찾기" description="탭을 눌러 예금과 적금 상품을 비교해보세요."/>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Tabs defaultValue="savings" className="w-full mt-8">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="savings">예금</TabsTrigger>
                            <TabsTrigger value="installment_savings">적금</TabsTrigger>
                        </TabsList>
                        <TabsContent value="savings">
                            <HomeFinancials financialProductType={"SAVINGS"}/>
                        </TabsContent>
                        <TabsContent value="installment_savings">
                            <HomeFinancials financialProductType={"INSTALLMENT_SAVINGS"}/>
                        </TabsContent>
                    </Tabs>
                </HydrationBoundary>
            </section>

            {/* Dynamic Post Grid Section */}
            <section>
                <PageTitle title="최신 포스트" description="따끈따끈한 최신 포스트들을 만나보세요."/>
                <div className="mt-8">
                    <LatestPosts/>
                </div>
            </section>
        </div>
    );
}