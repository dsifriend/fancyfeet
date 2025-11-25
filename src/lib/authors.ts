// src/lib/authors.ts
import type { Author } from './types';

// Use import.meta.glob to dynamically import all author markdown files
const authorFiles = import.meta.glob('/src/content/authors/*.md', { eager: true });

export function getAuthors(): Author[] {
	const authors: Author[] = [];

	for (const path in authorFiles) {
		const file = authorFiles[path] as any;

		// Extract the slug from the filename (e.g., 'jane-doe.md' -> 'jane-doe')
		const slug = path.split('/').pop()!.replace(/\.md$/, '');

		const metadata = file.metadata || {};

		if (metadata.name) {
			authors.push({
				slug,
				name: metadata.name,
				avatar: metadata.avatar,
				content: file.default
			});
		}
	}
	return authors;
}

/**
 * Helper function to get a single author by slug
 */
export function getAuthor(slug: string): Author | undefined {
	// TinaCMS reference fields store the path/filename of the linked document.
	return getAuthors().find((a) => a.slug === slug);
}
