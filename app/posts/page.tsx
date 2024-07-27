import {getSortedPostsData} from "@/lib/posts";
import Link from "next/link";


export const metadata = {
    title: 'My Blog',
};

function formatDate(dateString: string): string {
    // ISO 8601 날짜 문자열을 Date 객체로 변환
    const date = new Date(dateString);

    // 날짜와 시간을 포맷팅
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

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
                        <small>{formatDate(date)}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}