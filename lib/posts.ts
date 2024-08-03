import fs from 'fs';
import path from 'path';
import {compileMDX} from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import {PostData} from "@/types/posts";
import { sync } from 'glob';
import {doubleDecodeUriComponent} from "@/lib/utils";


const postsDirectory = path.join(process.cwd(), 'posts');

function getPostFiles(category?: string) {
    const folder = category? doubleDecodeUriComponent(category) : '**';
    const paths: string[] = sync(`${postsDirectory}/${folder}/**/*.mdx`);
    return paths;
};

export function encodeUriComponentSafe(str: string): string {
    return encodeURIComponent(str).replace(/[!'()*]/g, escape);
}

// Function to get post data
export async function getPostData(category: string, slug: string): Promise<PostData> {
    const filePath = path.join(postsDirectory, `${doubleDecodeUriComponent(path.join(category, slug))}`, 'content.mdx');
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
        const dirPath = path.dirname(filePath);

        // 2. 필요한 부분만 추출
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

export function getAllSlugIds(category?: string) {
    // 포스트 파일 경로를 가져옵니다.
    const filePaths = getPostFiles(category);

    // 파일 경로를 처리하여 슬러그를 생성합니다.
    return filePaths.map((filePath) => {
        // 파일 경로에서 디렉토리 이름을 추출합니다.
        const dirName = path.dirname(filePath);

        // 디렉토리 이름에서 마지막 부분을 추출합니다.
        const fileName = path.basename(dirName);

        // 슬러그로 사용하기 위해 URL-safe 문자열로 인코딩합니다.
        const slug = encodeURIComponent(fileName);
        return {
            slug: slug,
        };
    });
}

export function getAllCategoryIds(category?: string) {
    const filePaths = getPostFiles(category);

    return filePaths.map((filePath) => {
        // 전체 경로에서 "회고" 부분을 추출하기 위해 디렉토리 경로를 가져옵니다.
        const dirPath = path.dirname(filePath); // /Users/hwangjaejeong/study/javascript/sundry/posts/회고/늦었지만 2024년에 써보는 2023년 회고
        const parentDir = path.dirname(dirPath); // /Users/hwangjaejeong/study/javascript/sundry/posts/회고
        const categoryDir = path.basename(parentDir); // 회고
        return {
            category: encodeURIComponent(categoryDir),
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