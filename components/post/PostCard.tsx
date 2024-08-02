import {cn, formatDate} from "@/lib/utils"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"
import {PostData} from "@/types/posts";
import Link from "next/link";
import { CalendarRange } from 'lucide-react';
import Image from "next/image";


export function PostCard({ postData }: {postData: PostData}) {
    const thumbnailPath = postData.thumbnail? decodeURIComponent(postData.thumbnail).replace(/\+/g, ' ') : "/posts/default_thumbnail.jpg"

    return (
    <Card className={cn("w-[380px] h-[460px]")}>
        <Link href={`/posts/${postData.id}`}>
            <CardHeader>
                <Image
                    src={thumbnailPath}
                    alt="썸네일"
                    width={380} // 원하는 너비
                    height={200} // 원하는 높이
                />
            </CardHeader>
            <CardContent className="grid gap-4 min-h-36">
                <div className="space-y-1">
                    <p className="text-lg font-extralight text-lime-500">
                        {postData.category}
                    </p>
                    <p className="text-2xl font-medium ">
                        {postData.title}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="">
                <div className="flex space-x-2 text-neutral-500">
                    <CalendarRange /> <p>{formatDate(postData.date)}</p>
                </div>
            </CardFooter>
        </Link>
    </Card>
    )
}
