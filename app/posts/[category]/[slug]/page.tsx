import { Metadata } from 'next';
import {MDXRemote} from "next-mdx-remote/rsc";
import {useMDXComponents} from "@/app/mdx-components";
import {getAllPostIds, getPostData} from "@/lib/posts";
import {cn, formatDate} from "@/lib/utils";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import {CalendarRange} from "lucide-react";
import Link from "next/link";

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
    const { title, description, date, category, source } = await getPostData(params.category, params.slug);
    const components = useMDXComponents();
    const rehypeOptions = {
        theme: 'slack-dark',
        keepBackground: true,
    };
    const linkUrl = `/posts/${category}`
    return (
        <div className={"container mx-auto"}>
            <div className="text-center">
            <h1 className={cn("text-4xl fonts-bold")}>{title}</h1>
            <div className="flex flex-col space-x-2 text-neutral-500 mt-8">
                <div className="my-2 font-bold text-xl text-amber-700"><Link href={linkUrl}>{category}</Link></div>
                <div className="flex justify-center"><CalendarRange className="float-left" /> <p>{formatDate(date)}</p></div>
            </div>
            </div>
            <hr className="border-2 border-dotted my-8 border-amber-400" />
            <MDXRemote
                source={source}
                components={components}
                options={{
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [[rehypePrettyCode, rehypeOptions]]
                }}} />
        </div>
    );
}