import { generateFeed } from '$lib/feed';

// Only generate when requested.
export const prerender = false;

export async function GET() {
	const feed = await generateFeed();

	return new Response(feed.json1(), {
		headers: {
			'Content-Type': 'application/feed+json',
			'Cache-Control': 'max-age=0, s-maxage=10800'
		}
	});
}
