import { getAllCategories, getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/post/PostCard";
import CategorySelect from "@/components/post/CategorySelect";

export default async function Posts({ category }: { category?: string }) {
    const allPostsData = await getSortedPostsData(category);
    const { allCategories } = getAllCategories(category);
    return (
        <div className="flex flex-col items-center mx-auto">
            <CategorySelect selectedCategory={category} categories={allCategories} />
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {allPostsData.map(postData => (
                    <li key={postData.id}>
                        <PostCard postData={postData} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
