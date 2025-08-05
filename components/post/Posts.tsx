import { getAllCategories, getSortedPostsData } from "@/lib/posts";
import { PostCard } from "@/components/post/PostCard";
import CategorySelect from "@/components/post/CategorySelect";
import Pagination from "@/components/Pagination";
import Search from "@/components/post/Search";

export default async function Posts({ category, searchParams }: { category?: string, searchParams: { page?: string, query?: string } }) {
    const currentPage = Number(searchParams?.page) || 1;
    const pageSize = 9; // Display 9 posts per page for a 3x3 grid
    const query = searchParams?.query || '';

    const { posts: allPostsData, totalPages } = await getSortedPostsData(category, currentPage, pageSize, query);
    const { allCategories } = getAllCategories(category);

    return (
        <div className="flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-8">
                <CategorySelect selectedCategory={category} categories={allCategories} />
                <Search placeholder="Search posts..." />
            </div>
            {allPostsData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 w-full">
                    {allPostsData.map(postData => (
                        <PostCard key={postData.id} postData={postData} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted-foreground mt-8">No posts found.</p>
            )}
            <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
    );
}
