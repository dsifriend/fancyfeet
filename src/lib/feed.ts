import { Feed } from 'feed';
import { getPosts } from '$lib/posts';
import { render } from 'svelte/server';

const DEPLOYMENT_URL = 'https://fancyfeet.cat';
const DEV_URL = 'http://localhost:5173'; // Default SvelteKit dev port

// import.meta.env.DEV is true during dev, false during build/production
const IS_DEV = import.meta.env.DEV;

const SITE_URL = IS_DEV ? DEV_URL : DEPLOYMENT_URL;
console.log(`IS_DEV:${IS_DEV}; URL: ${SITE_URL}`);
const SITE_TITLE = 'FancyFeet.Cat Mews';
const SITE_DESCRIPTION = 'Your source for the fanciest cat feet.';

export async function generateFeed() {
	const posts = getPosts();

	const feed = new Feed({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		id: SITE_URL,
		link: SITE_URL,
		language: 'en',
		image: `${SITE_URL}/images/favicon.png`,
		favicon: `${SITE_URL}/images/favicon.png`,
		copyright: `© ${new Date().getFullYear()}, ${SITE_TITLE}`,
		updated: posts[0]?.date, // date of the latest post
		generator: 'SvelteKit + Feed',
		feedLinks: {
			rss: `${SITE_URL}/rss.xml`,
			atom: `${SITE_URL}/atom.xml`,
			json: `${SITE_URL}/feed.json`
		},
		author: {
			name: 'The Society for Fancy Cat Feet',
			link: SITE_URL
		}
	});

	for (const post of posts) {
		// Svelte 5 Server Rendering
		// The mdsvex component is rendered as an HTML string for the feed body
		const { body: postHtml } = render(post.content);

		feed.addItem({
			title: post.title,
			id: `${SITE_URL}/blog/posts/${post.slug}`,
			link: `${SITE_URL}/blog/posts/${post.slug}`,
			description: post.summary,
			content: postHtml,
			author: [
				{
					name: post.author.name,
					link: `${SITE_URL}/blog/authors/${post.author.slug}` // Adjust path if needed
				}
			],
			date: new Date(post.date),
			image: `${SITE_URL}${post.image}`
		});
	}

	return feed;
}
