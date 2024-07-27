import { Metadata } from 'next';
import {getAllPostIds, getPostData} from "@/lib/posts";
import {Suspense} from "react";
import {MDXRemote} from "next-mdx-remote/rsc";
import {useMDXComponents} from "@/app/mdx-components";

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
            <Suspense fallback={<>Loading...</>}>
                <MDXRemote source={source} components={components} />;
            </Suspense>
        </>
    );
}