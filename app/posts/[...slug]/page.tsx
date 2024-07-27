import {PostData} from "@/types/posts";

export const runtime = 'edge';
import { Metadata } from 'next';
import {MDXRemote} from "next-mdx-remote/rsc";
import {useMDXComponents} from "@/app/mdx-components";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

interface Params {
    params: {
        slug: string[];
    };
}

async function fetchPostData(slug: string[]) {
    const res = await fetch(`${baseUrl}/api/posts/${slug.join('/')}`);
    if (!res.ok) {
        throw new Error('Failed to fetch post data');
    }
    return res.json();
}

export async function generateStaticParams() {
    const res = await fetch(`${baseUrl}/api/posts`);
    if (!res.ok) {
        throw new Error('Failed to fetch post data');
    }
    const posts = await res.json() as PostData[];
    return posts.map((post) => post.id);
}

export async function generateMetadata({ params }: Params ): Promise<Metadata> {
    const { title, description } = await fetchPostData(params.slug);

    return {
        title,
        description, // Optional, add if needed
    };
}

export default async function Post({ params }: Params) {
    const { title, description, source } = await fetchPostData(params.slug);
    const components = useMDXComponents();
    // Render the page
    return (
        <>
            <h1>{title}</h1>
            <p>{description}</p>
            <MDXRemote source={source} components={components} options={{parseFrontmatter:false}} />;
        </>
    );
}