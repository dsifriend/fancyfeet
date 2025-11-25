import { getAuthors } from '$lib/authors';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	const authors = getAuthors();

	// Pass the full list of authors to the page
	return {
		authors: authors
	};
};
