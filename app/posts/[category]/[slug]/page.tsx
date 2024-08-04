import {Metadata, ResolvingMetadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {useMDXComponents} from '@/app/mdx-components';
import {getAllSlugIds, getPostData} from '@/lib/posts';
import {cn, decodeUriComponentSafe, doubleDecodeUriComponent, formatDate, getMetadata} from '@/lib/utils';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import {CalendarRange} from 'lucide-react';
import Link from 'next/link';
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import CustomTOC from "@/components/post/CustomTOC";

interface Params {
    params: {
        category: string;
        slug: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
    const paths = getAllSlugIds();
    return paths;
}

export async function generateMetadata({params, searchParams}: Params, parent: ResolvingMetadata): Promise<Metadata> {
    const {title, description, thumbnail} = await getPostData(params.category, params.slug);
    const thumbnailPath = thumbnail ? doubleDecodeUriComponent(thumbnail) : '/posts/default_thumbnail.jpg';
    const asPath = decodeUriComponentSafe(`/posts/${params.category}/${params.slug}`);
    return getMetadata({title: title, description: description, ogImage: thumbnailPath, asPath: asPath});
}

export default async function Post({params}: Params) {
    const {title, description, date, category, source} = await getPostData(params.category, params.slug);
    console.log(params)
    const components = useMDXComponents();
    const rehypeOptions = {
        theme: 'one-light', // 밝은 배경을 사용하는 테마
        keepBackground: true,
    };
    const linkUrl = `/posts/${category}`;
    return (
        <div className="container mx-auto">
            <div className="text-center">
                <h1 className={cn('text-4xl fonts-bold')}>{title}</h1>
                <div className="flex flex-col space-x-2 text-neutral-500 mt-8">
                    <div className="my-2 font-bold text-xl text-amber-700"><Link href={linkUrl}>{category}</Link></div>
                    <div className="flex justify-center"><CalendarRange className="float-left"/>
                        <p>{formatDate(date)}</p>
                    </div>
                </div>
            </div>
            <hr className="border-2 border-dotted my-8 border-amber-400"/>
            <CustomTOC title="목차" /> {/* 사용자 정의 TOC 컴포넌트 추가 */}
            <MDXRemote
                source={source}
                components={components}
                options={{
                    parseFrontmatter: true,
                    mdxOptions: {
                        remarkPlugins: [remarkToc, remarkGfm, remarkSlug],
                        rehypePlugins: [
                            [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: 'toc-link' } }],
                            [rehypePrettyCode, rehypeOptions]
                        ]
                    }
                }}
            />
        </div>
    );
}
