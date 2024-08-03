import Posts from "@/components/post/Posts";
import {getMetadata} from "@/lib/utils";


export const metadata = getMetadata({title: '게시판', asPath:'/posts'});

export default function Home() {
    return <Posts />
}