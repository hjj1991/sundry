import { Metadata } from 'next';
import {MDXRemote} from "next-mdx-remote/rsc";
import {useMDXComponents} from "@/app/mdx-components";
import {getAllPostIds, getPostData} from "@/lib/posts";
import {cn, formatDate} from "@/lib/utils";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

interface Params {
    params: {
        category: string
        slug: string;
    };
}

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths;
}

export async function generateMetadata({ params }: Params ): Promise<Metadata> {
    const { title, description } = await getPostData(params.category, params.slug);

    return {
        title,
        description, // Optional, add if needed
    };
}

export default async function Post({ params }: Params) {
    console.log(params)
    const { title, description, date, source } = await getPostData(params.category, params.slug);
    const components = useMDXComponents();
    const rehypeOptions = {
        theme: 'slack-dark',
        keepBackground: true,
    };
    // Render the page
    return (
        <div className={"container mx-auto"}>
            <h1 className={cn("text-6xl font-bold")}>{title}</h1>
            <div>{formatDate(date)}</div>
            <p>{description}</p>
            <MDXRemote
                source={source}
                components={components}
                options={{
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [[rehypePrettyCode, rehypeOptions]]
                }}} />;
        </div>
    );
}