import { getPostsMetadata, getPost } from '$lib/posts';
import type { PostMetadata } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	// Get the most recent post
	const latestPost = getPost(getPostsMetadata().at(0)?.slug ?? '');

	// Get the next 4 most recent posts
	const recentPosts = getPostsMetadata().slice(1, 5) as PostMetadata[];

	return {
		latestPost,
		recentPosts
	};
};
