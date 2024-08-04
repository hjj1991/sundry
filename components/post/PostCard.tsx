import { cn, doubleDecodeUriComponent, formatDate } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { PostData } from "@/types/posts";
import Link from "next/link";
import { CalendarRange } from 'lucide-react';
import Image from "next/image";

export function PostCard({ postData }: { postData: PostData }) {
    const thumbnailPath = postData.thumbnail ? doubleDecodeUriComponent(postData.thumbnail) : "/posts/default_thumbnail.jpg";
    console.log(thumbnailPath)

    return (
        <Card className={cn("w-[380px] h-[460px] bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700")}>
            <Link href={`/posts/${postData.id}`}>
                <CardHeader className="relative h-64 w-full overflow-hidden p-2 rounded-lg"> {/* 패딩 및 둥근 모서리 추가 */}
                    <div className="absolute inset-2 rounded-lg overflow-hidden"> {/* 여백과 둥근 모서리 추가 */}
                        <Image
                            src={thumbnailPath}
                            alt="썸네일"
                            layout="fill" // Image를 부모 컨테이너에 맞춤
                            objectFit="cover" // 이미지가 부모 컨테이너를 넘치지 않도록 설정
                            objectPosition="center" // 이미지를 가운데 정렬
                            className="w-full h-full rounded-lg" // 이미지에 둥근 모서리 추가
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
