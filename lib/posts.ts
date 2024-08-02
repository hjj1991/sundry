import fs from 'fs';
import path from 'path';
import {compileMDX} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {PostData} from "@/types/posts";
import { sync } from 'glob';


const postsDirectory = path.join(process.cwd(), 'posts');

function getPostFiles(category?: string) {
    const folder = category? decodeUriComponentSafe(category) : '**';
    const paths: string[] = sync(`${postsDirectory}/${folder}/**/*.mdx`);
    return paths;
};

export function encodeUriComponentSafe(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);
}

export function decodeUriComponentSafe(str: string): string {
    return decodeURIComponent(str.replace(/\+/g, ' '));
}

// Function to get post data
export async function getPostData(category: string, slug: string): Promise<PostData> {
    const filePath = path.join(postsDirectory, `${decodeUriComponentSafe(path.join(category, slug))}`, 'content.mdx');
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
        source,
    };
}

export async function getSortedPostsData(category?: string): Promise<PostData[]> {
    const filePaths = getPostFiles(category);
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

        // 1. 파일명을 제외한 디렉토리 경로 추출
        const dirPath = path.dirname(filePath); // '/Users/hwangjaejeong/study/javascript/sundry/posts/잡다한거/테스트'

        // 2. 필요한 부분만 추출 (잡다한거/테스트)
        const segments = dirPath.split(path.sep); // 경로를 배열로 분할
        const startIndex = segments.indexOf('posts') + 1; // 'posts' 다음 인덱스부터 추출
        const categoryAndTitle = segments.slice(startIndex, startIndex + 2);


        // 3. 문자열로 결합
        const id = categoryAndTitle.join('/');

        return {
            id: id,
            title: frontmatter.title,
            date: frontmatter.date,
            category: frontmatter.category,
            source: fileContents,
            thumbnail: frontmatter.thumbnail,
        } as PostData;
    }));

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}
export function getAllPostIds(category?: string) {
    const filePaths = getPostFiles(category);
    return filePaths.map((filePath) => {
        const id = path.basename(filePath, '.mdx'); // 파일 이름에서 .md를 제거하여 ID 추출
        return {
            params: {
                slug: encodeUriComponentSafe(id),
            },
        };
    });
}

export function getAllCategories(filter?: string): {allCategories: string[], selectedCategory: string } {
    const filePaths = getPostFiles();
    const categories = new Set<string>();

    filePaths.forEach(filePath => {
        const segments = filePath.split(path.sep);
        const startIndex = segments.indexOf('posts') + 1;
        const category = segments[startIndex];
        if (category) {
            categories.add(category);
        }
    });

    const allCategories = Array.from(categories);
    let selectedCategory = '';
    if (filter) {
        const filteredCategories = allCategories.filter(category => category.includes(filter));
        if (filteredCategories.length > 0) {
            selectedCategory = filteredCategories[0];
        }
    }

    return {
        allCategories: allCategories,
        selectedCategory: selectedCategory
    };
}