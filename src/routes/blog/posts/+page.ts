import { getPostsMetadata } from '$lib/posts';
import type { PageLoad } from '../$types';

// Number of posts to display per page
const PAGE_SIZE = 10;

export const load: PageLoad = () => {
	const allPosts = getPostsMetadata();

	return {
		posts: allPosts, // Return ALL posts to the component
		pageSize: PAGE_SIZE,
		totalCount: allPosts.length
	};
};

export const prerender = true;
