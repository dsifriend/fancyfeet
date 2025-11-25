import { getPost, getPosts } from '$lib/posts';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageLoad } from './$types';

// 1. Generate the list of all slugs (paths) to pre-render
export const entries: EntryGenerator = () => {
	const posts = getPosts();
	return posts.map((post) => ({ slug: post.slug }));
};

// 2. Load data for the current page
export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);

	if (!post) {
		error(404, 'Post not found');
	}

	// The content is the Svelte component compiled from Markdown
	const content = post.content;

	return {
		post: {
			title: post.title,
			date: post.date,
			author: post.author,
			tags: post.tags,
			image: post.image,
			summary: post.summary,
			slug: post.slug
		},
		content // Pass the Svelte component to the +page.svelte
	};
};
