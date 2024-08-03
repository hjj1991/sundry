import {getAllCategoryIds} from "@/lib/posts";
import {decodeUriComponentSafe, getMetadata} from "@/lib/utils";
import Posts from "@/components/post/Posts";
import {Metadata, ResolvingMetadata} from "next";

interface Params {
    params: {
        category: string
    }
    searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateStaticParams() {
    const paths = getAllCategoryIds();
    return paths;
}

export async function generateMetadata({params, searchParams}: Params, parent: ResolvingMetadata): Promise<Metadata> {
    const asPath = decodeUriComponentSafe(`/posts/${params.category}`);
    return getMetadata({title: decodeUriComponentSafe(params.category), asPath: asPath});
}

export default function Category({params: {category}}: { params: { category: string } }) {
    return <Posts category={category}/>
}