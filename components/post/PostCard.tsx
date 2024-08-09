import { cn, formatDate } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PostData } from "@/types/posts";
import Link from "next/link";
import { CalendarRange } from 'lucide-react';
import Image from "next/image";

export function PostCard({ postData }: { postData: PostData }) {
    const thumbnailPath = postData.thumbnail ? postData.thumbnail : "/posts/default_thumbnail.jpg";
    return (
        <Card className={cn("w-[380px] h-[460px] bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700")}>
            <Link href={`/posts/${postData.id}`}>
                <CardHeader className="relative h-64 w-full overflow-hidden p-2 rounded-lg">
                    <div className="relative h-full w-full rounded-lg overflow-hidden">
                        <Image
                            src={thumbnailPath}
                            alt="썸네일"
                            fill
                            style={{ objectFit: "contain" }} // objectFit prop 대체
                            className="w-full h-full rounded-lg"
                            priority={true} // LCP로 감지된 이미지에 priority 추가
                        />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-4 min-h-36">
                    <div className="space-y-1">
                        <p className="text-lg font-extralight text-lime-500 dark:text-lime-400">
                            {postData.category}
                        </p>
                        <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">
                            {postData.title}
                        </p>
                    </div>
                </CardContent>
                <CardFooter className="flex space-x-2 text-neutral-500 dark:text-neutral-400">
                    <CalendarRange /> <p>{formatDate(postData.date)}</p>
                </CardFooter>
            </Link>
        </Card>
    );
}
