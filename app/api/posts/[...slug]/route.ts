import { getPostData } from '@/lib/posts';
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string[] } }) {
    const { slug } = params;
    try {
        const postData = await getPostData(slug);
        return NextResponse.json(postData);
    } catch (error) {
        return NextResponse.error();
    }
}