export const runtime = 'edge';
import { Metadata } from 'next';
import {getAllPostIds, getPostData} from "@/lib/posts";


const postsDirectory = 'posts';

interface Params {
    params: {
        slug: string[];
    };
}

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths;
}

export async function generateMetadata({ params }: Params ): Promise<Metadata> {
    const { title, description } = await getPostData(params.slug);

    return {
        title,
        description, // Optional, add if needed
    };
}

export default async function Post({ params }: Params) {
    const { title, description, content } = await getPostData(params.slug);

    // Render the page
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
            <div>{content}</div>
        </>
    );
}