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

    return (
        <Card className={cn("w-[380px] h-[460px]")}>
            <Link href={`/posts/${postData.id}`}>
                <CardHeader className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={thumbnailPath}
                        alt="썸네일"
                        layout="fill" // Image를 부모 컨테이너에 맞춤
                        objectFit="contain" // 이미지가 부모 컨테이너를 넘치지 않도록 설정
                        objectPosition="center" // 이미지를 가운데 정렬
                        className="absolute inset-0 w-full h-full"
                    />
                </CardHeader>
                <CardContent className="grid gap-4 min-h-36">
                    <div className="space-y-1">
                        <p className="text-lg font-extralight text-lime-500">
                            {postData.category}
                        </p>
                        <p className="text-2xl font-medium">
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
    );
}
