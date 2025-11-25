import { generateFeed } from '$lib/feed';

// Only generate when requested.
export const prerender = false;

export async function GET() {
	const feed = await generateFeed();

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml',
			'Cache-Control': 'max-age=0, s-maxage=10800'
		}
	});
}
