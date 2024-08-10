// components/LatestPosts.tsx
import {PostData} from "@/types/posts";
import Link from "next/link";
import {getLatestPostsData} from "@/lib/posts";

// LatestPosts component
export default async function LatestPosts() {
    const posts: PostData[] = await getLatestPostsData(10);

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    최신 글
                </h2>
            </div>
            <ul className="space-y-4">
                {posts.map((post) => (
                    <li key={post.id}
                        className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4">
                        <Link href={`/posts/${post.id}`}
                              className="text-base font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                            {post.title}
                        </Link>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(post.date).toLocaleDateString('ko-KR',
                                {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
