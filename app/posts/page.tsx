import {getSortedPostsData} from "@/lib/posts";
import Link from "next/link";


export const metadata = {
    title: 'My Blog',
};

export default async function Home() {
    const allPostsData = await getSortedPostsData();
    return (
        <div>
            <h1>My Blog</h1>
            <ul>
                {allPostsData.map(({id, title, date}) => (
                    <li key={id}>
                        <Link href={`/posts/${id}`}>{title}</Link>
                        <br/>
                        <small>{date}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}