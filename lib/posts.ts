import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {compileMDX} from "next-mdx-remote/rsc";
import {ReactElement} from "react";
import {useMDXComponents} from "@/app/mdx-components";
import remarkGfm from "remark-gfm";


const postsDirectory = path.join(process.cwd(), 'posts');

interface PostData {
    id: string;
    title: string;
    date: string;
    category: string;
    description: string;
    content: ReactElement;
}

function getPostFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getPostFiles(filePath));
        } else {
            results.push(filePath);
        }
    });
    return results;
}

export function encodeUriComponentSafe(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);
}

export function decodeUriComponentSafe(str: string): string {
    return decodeURIComponent(str.replace(/\+/g, ' '));
}

// Function to get post data
export async function getPostData(slug: string[]): Promise<PostData> {
    const filePath = path.join(postsDirectory, `${decodeUriComponentSafe(slug.join('/'))}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    const id = path.basename(filePath, path.extname(filePath)); // 파일 이름에서 확장자를 제거하여 ID 추출
    const { content, frontmatter } = await compileMDX({
        source,
        options: {
            mdxOptions: {
                remarkPlugins: [remarkGfm],
            },
            parseFrontmatter: true,
        },
    });

    return {
        id: id,
        title: frontmatter.title as string,
        date: frontmatter.date as string,
        description: frontmatter.description as string,
        category: frontmatter.category as string,
        content,
    };
}

export async function getSortedPostsData(): Promise<PostData[]> {
    const filePaths = getPostFiles(postsDirectory);

    const allPostsData = await Promise.all(filePaths.map(async (filePath) => {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { content, frontmatter } = await compileMDX({
            source: fileContents,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [],
                    rehypePlugins: []
                }
            }
        });

        const id = path.basename(filePath, path.extname(filePath)); // 파일 이름에서 확장자를 제거하여 ID 추출
        return {
            id: id,
            title: frontmatter.title,
            date: frontmatter.date,
            category: frontmatter.category,
            content: content,
        } as PostData;
    }));

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getAllPostIds() {
    const filePaths = getPostFiles(postsDirectory);
    return filePaths.map((filePath) => {
        const id = path.basename(filePath, '.mdx'); // 파일 이름에서 .md를 제거하여 ID 추출
        return {
            params: {
                slug: encodeUriComponentSafe(id),
            },
        };
    });
}
