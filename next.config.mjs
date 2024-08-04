import withMDX from '@next/mdx';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import remarkSlug from "remark-slug";

const nextConfig = {
    output: 'standalone',
    // 다른 설정들
    env: {
        API_SERVER_HOST: process.env.API_SERVER_HOST,
    },
    // 마크다운 및 MDX 파일을 포함시키기 위해 페이지 확장자 설정
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const mdxConfig = withMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [remarkToc, remarkGfm, remarkSlug],
        rehypePlugins: [
            [
                [rehypeAutolinkHeadings, { behavior: 'append', properties: { className: 'toc-link' } }],
            ],
            [rehypePrettyCode]
        ]
    },
})(nextConfig);

export default mdxConfig;
