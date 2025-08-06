import {Metadata, ResolvingMetadata} from 'next';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {useMDXComponents} from '@/app/mdx-components';
import {getAllSlugIds, getPostData} from '@/lib/posts';
import {cn, decodeUriComponentSafe, doubleDecodeUriComponent, formatDate, getMetadata} from '@/lib/utils';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import {CalendarRange, Tag} from 'lucide-react';
import Link from 'next/link';
import remarkToc from "remark-toc";
import remarkSlug from "remark-slug";
import CustomTOC from "@/components/post/CustomTOC";
import Giscus from "@/components/Giscus";
import AuthorBio from "@/components/AuthorBio";

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

const PostContent = ({ source }: { source: string }) => {
    const components = useMDXComponents();
    const rehypeOptions = {
        theme: 'one-dark-pro',
        keepBackground: true,
    };

    return (
        <MDXRemote
            source={source}
            components={components}
            options={{
                parseFrontmatter: true,
                mdxOptions: {
                    // @ts-ignore
                    remarkPlugins: [remarkToc, remarkGfm, remarkSlug],
                    rehypePlugins: [
                        [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: 'toc-link' } }],
                        [rehypePrettyCode, rehypeOptions]
                    ]
                }
            }}
        />
    );
};

export default async function Post({params}: Params) {
    const {title, description, date, category, source} = await getPostData(params.category, params.slug);
    const linkUrl = `/posts/${category}`;
    return (
        <div>
            <div className="text-center mb-8">
                <h1 className={cn('text-4xl md:text-5xl font-bold font-heading mb-4')}>{title}</h1>
                <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
                    <Link
                        href={linkUrl}
                        className="inline-flex items-center text-lg font-heading hover:text-primary transition-colors"
                    >
                        <Tag className="mr-2 w-5 h-5"/>
                        <span>{category}</span>
                    </Link>
                    <div className="flex items-center text-sm">
                        <CalendarRange className="mr-2 w-4 h-4"/>
                        <p>{formatDate(date)}</p>
                    </div>
                </div>
            </div>
            <hr className="border-t-2 border-dashed border-border my-8"/>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
                <article className="prose dark:prose-invert max-w-none">
                    <PostContent source={source} />
                </article>
                <aside className="hidden lg:block sticky top-24 h-fit">
                    <CustomTOC title="목차"/>
                </aside>
            </div>
            <hr className="border-t-2 border-dashed border-border my-8"/>
            <AuthorBio />
            <Giscus/>
        </div>
    );
}
