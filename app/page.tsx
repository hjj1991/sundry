import PageTitle from "@/components/PageTitle";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col gap-5 w-full">
            <PageTitle title="Dashboard"/>
            <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
            </section>

            <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
            </section>
        </div>
    )
}