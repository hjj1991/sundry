// app/api/ai-search/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const query = new URL(req.url).searchParams.get('query');
    if (!query) return new Response(JSON.stringify({ error: 'query required' }), { status: 400 });

    const upstream = await fetch(
        `${process.env.API_SERVER_HOST}/financial-products/search/stream?query=${encodeURIComponent(query)}`,
        {
            headers: { Accept: 'text/event-stream', 'Cache-Control': 'no-cache' },
            cache: 'no-store',
        }
    );

    if (!upstream.ok || !upstream.body) {
        const details = await upstream.text().catch(() => '');
        return new Response(JSON.stringify({ error: 'upstream error', details }), { status: upstream.status || 502 });
    }

    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = upstream.body.getReader();

    (async () => {
        await writer.write(new TextEncoder().encode(':proxy-connected\n\n'));
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                if (value) await writer.write(value); // 그대로 relay
            }
        } finally {
            await writer.close();
            reader.releaseLock();
        }
    })();

    return new Response(readable, {
        headers: {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache, no-transform',
            'X-Accel-Buffering': 'no',
        },
    });
}