import { Metadata } from 'next';
import {MDXRemote} from "next-mdx-remote/rsc";
import {useMDXComponents} from "@/app/mdx-components";
import {getAllPostIds, getPostData} from "@/lib/posts";

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
    const { title, description, source } = await getPostData(params.slug);
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