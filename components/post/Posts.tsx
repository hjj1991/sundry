import { getAllCategories, getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/post/PostCard";
import CategorySelect from "@/components/post/CategorySelect";
import Pagination from "@/components/Pagination";

export default async function Posts({ category, searchParams }: { category?: string, searchParams: { page?: string } }) {
    const currentPage = Number(searchParams?.page) || 1;
    const pageSize = 9; // Display 9 posts per page for a 3x3 grid

    const { posts: allPostsData, totalPages } = await getSortedPostsData(category, currentPage, pageSize);
    const { allCategories } = getAllCategories(category);

    return (
                <div className="flex flex-col items-center">
            <CategorySelect selectedCategory={category} categories={allCategories} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 w-full">
                {allPostsData.map(postData => (
                    <PostCard key={postData.id} postData={postData} />
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}
