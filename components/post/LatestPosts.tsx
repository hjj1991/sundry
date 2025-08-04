import { PostData } from "@/types/posts";
import { getLatestPostsData } from "@/lib/posts";
import {PostCard} from "@/components/post/PostCard";

// LatestPosts component
export default async function LatestPosts() {
    const posts: PostData[] = await getLatestPostsData(6); // Fetch 6 posts for a 2x3 grid

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <PostCard key={post.id} postData={post} />
            ))}
        </div>
    );
}
