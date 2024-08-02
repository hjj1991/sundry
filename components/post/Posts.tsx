import {getAllCategories, getSortedPostsData} from "@/lib/posts";
import {PostCard} from "@/components/post/PostCard";
import CategorySelect from "@/components/post/CategorySelect";


export default async function Posts({category} : {category?: string}) {
    const allPostsData = await getSortedPostsData(category);
    const { allCategories, selectedCategory } = getAllCategories(category);
    return (
        <div className={"container mx-auto"}>
            <CategorySelect selectedCategory={category} categories={allCategories} />
            <ul className={"flex flex-wrap gap-x-8 gap-y-4"}>
                {allPostsData.map( postData => (
                    <li key={postData.id}>
                    <PostCard postData={postData} />
                    </li>
                ))}
            </ul>
        </div>
    );
}