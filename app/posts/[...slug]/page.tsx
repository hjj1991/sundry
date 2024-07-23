import { Metadata } from 'next';
import {decodeUriComponentSafe, getAllPostIds} from "@/lib/posts";
import {useMDXComponents} from "@/app/mdx-components";
import fs from "fs";
import {compileMDX} from "next-mdx-remote/rsc";
import path from "path";
import remarkGfm from "remark-gfm";

const postsDirectory = 'posts';

interface Params {
    params: {
        slug: string[];
    };
}

// Function to get post data
export async function getPostData(slug: string[]): Promise<{ title: string; description: string }> {
    const source = fs.readFileSync(
        path.join(process.cwd(), postsDirectory, decodeUriComponentSafe(slug.join("/"))) + ".mdx",
        "utf8",
    );

    const { frontmatter } = await compileMDX({
        source,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
            parseFrontmatter: true,
        },
    });

    return {
        title: frontmatter.title as string,
        description: frontmatter.description as string,
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
    const source = fs.readFileSync(
        path.join(process.cwd(), postsDirectory, decodeUriComponentSafe(params.slug.join("/"))) + ".mdx",
        "utf8",
    );

    // MDX accepts a list of React components
    const components = useMDXComponents({});

    // We compile the MDX content with the frontmatter, components, and plugins
    const { content, frontmatter } = await compileMDX({
        source,
        options: {
            mdxOptions: {
                rehypePlugins: [],
                remarkPlugins: [remarkGfm],
            },
            parseFrontmatter: true,
        },
        components,
    });

    // (Optional) Set some easy variables to assign types, because TypeScript
    const pageTitle = frontmatter.title as string;
    const pageDescription = frontmatter.description as string;

    // Render the page
    return (
        <>
            <h1>{pageTitle}</h1>
            <p>{pageDescription}</p>
            <div>
                {content}
            </div>
        </>
    );
}