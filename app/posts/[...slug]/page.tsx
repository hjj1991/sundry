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
    try {
        const res = await fetch(`${baseUrl}/api/posts`);
        if (!res.ok) {
            throw new Error('Failed to fetch post IDs');
        }
        const posts = await res.json();
        return posts.map((post: { id: string }) => ({
            params: { slug: post.id },
        }));
    } catch (error) {
        console.error('Error fetching post IDs:', error);
        return [];
    }
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