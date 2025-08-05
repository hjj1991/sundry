import {cn, formatDate} from "@/lib/utils";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {PostData} from "@/types/posts";
import Link from "next/link";
import {CalendarRange} from 'lucide-react';
import Image from "next/image";

export function PostCard({postData}: { postData: PostData }) {
    const thumbnailPath = postData.thumbnail ? postData.thumbnail : "/posts/default_thumbnail.jpg";
    return (
        <Card
            className={cn("group relative flex flex-col h-full bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2")}>
            <Link href={`/posts/${postData.id}`} className="flex flex-col h-full">
                <CardHeader className="relative h-48 w-full overflow-hidden p-0 bg-muted">
                    <Image
                        src={thumbnailPath}
                        alt={postData.title}
                        fill
                        style={{objectFit: "contain"}}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
                </CardHeader>
                <CardContent className="flex-grow p-6 grid gap-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">
                            {postData.category}
                        </p>
                        <h3 className="text-xl font-bold leading-snug break-words">
                            {postData.title}
                        </h3>
                    </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-6 pt-0 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                        <CalendarRange className="h-4 w-4"/> 
                        <p>{formatDate(postData.date)}</p>
                    </div>
                </CardFooter>
            </Link>
        </Card>
    );
}
