export interface Author {
	// Slug is derived from the author's filename (e.g., 'jane-doe')
	slug: string;
	name: string;
	avatar?: string;
	content: any; // The compiled Svelte component for author page body (`bio`)
}

export interface PostMetadata {
	slug: string;
	title: string;
	date: Date;
	summary: string;
	tags?: string[];
	sponsored?: boolean;
	image?: string;
	author: Author;
}

export interface Post extends PostMetadata {
	content: any;
}
