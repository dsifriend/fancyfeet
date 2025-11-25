import type { Post, PostMetadata, Author } from './types';
import { getAuthor, getAuthors } from './authors';

// Use import.meta.glob to dynamically import all markdown files at build time
const postFiles = import.meta.glob('/src/content/posts/*.md', { eager: true });

function processPost(path: string, file: any, resolvedAuthor: Author): PostMetadata {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');

	const metadata = file.metadata || {};

	return {
		slug,
		date: new Date(metadata.date),
		title: metadata.title,
		summary: metadata.summary,
		author: resolvedAuthor,
		tags: metadata.tags || [],
		sponsored: metadata.sponsored || false,
		image: metadata.image
	};
}

/** Creates an index of all published posts. */
function resolveAllPosts(): { metadata: PostMetadata; file: any }[] {
	const allPosts: { metadata: PostMetadata; file: any }[] = [];
	const authorsMap = getAuthors().reduce(
		(acc, author) => {
			acc[author.slug] = author;
			return acc;
		},
		{} as Record<string, Author>
	);

	for (const path in postFiles) {
		const file = postFiles[path] as any;
		const metadata = file.metadata || {};

		if (metadata.title && metadata.date && metadata.authors) {
			// Normalize author slug from the reference field
			const authorRef =
				typeof metadata.authors === 'string' ? metadata.authors : (metadata.authors as any).authors;
			const authorSlug = authorRef.split('/').pop()?.replace(/\.md$/, '');

			const resolvedAuthor = authorSlug ? authorsMap[authorSlug] : undefined;

			if (!resolvedAuthor) continue;

			const postMetadata = processPost(path, file, resolvedAuthor);

			allPosts.push({ metadata: postMetadata, file: file });
		}
	}

	// Sort posts by date (newest first - reverse chronological)
	allPosts.sort((a, b) => b.metadata.date.getTime() - a.metadata.date.getTime());

	// Return only posts set to publish in the past.
	return allPosts.filter((p) => p.metadata.date.getTime() < new Date().getTime());
}

/** Returns a lightweight array of all post metadata, sorted reverse-chronologically. */
export function getPostsMetadata(): PostMetadata[] {
	return resolveAllPosts().map((p) => p.metadata);
}

/** Returns all published posts including body content. */
export function getPosts(): Post[] {
	const posts = resolveAllPosts().map((p) => ({
		...p.metadata,
		content: p.file.default
	})) as Post[];

	return posts;
}

export function getPost(slug: string) {
	const posts = getPosts();
	return posts.find((p) => p.slug === slug);
}
