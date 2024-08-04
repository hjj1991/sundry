import {MetadataRoute} from 'next'
import {getSortedPostsData} from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://sundry.ninja";
    const posts = await getSortedPostsData();
    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.id}`,
        lastModified: new Date(post.date).toISOString(), // 날짜를 ISO 8601 형식으로 변환
    }));
    return [
        {url: baseUrl, lastModified: new Date()},
        {url: `${baseUrl}/posts`, lastModified: new Date()},
        {url: `${baseUrl}/financials`, lastModified: new Date()},
        ...postUrls
    ]
}