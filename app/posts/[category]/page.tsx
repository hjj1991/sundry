import {getSortedPostsData} from "@/lib/posts";
import Link from "next/link";
import {formatDate} from "@/lib/utils";
import Posts from "@/components/post/Posts";


export const metadata = {
    title: 'My Blog',
};

export default function Category({ params: { category }} : { params: { category: string } }) {
    return <Posts category={category} />
}