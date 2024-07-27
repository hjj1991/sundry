import { NextResponse } from 'next/server';
import { getSortedPostsData} from '@/lib/posts';

export async function GET() {
    try {
        const posts = await getSortedPostsData();
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch post IDs' }, { status: 500 });
    }
}