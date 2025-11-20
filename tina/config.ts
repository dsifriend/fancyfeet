import { TinaCMS, Form, defineConfig } from 'tinacms';

// Hosting provider likely exposes this as an environment variable
const branch = process.env.GITHUB_BRANCH || process.env.HEAD || 'main';

export default defineConfig({
	branch,

	// Get this from tina.io
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	// Get this from tina.io
	token: process.env.TINA_TOKEN,

	build: {
		outputFolder: 'admin',
		publicFolder: 'static'
	},
	media: {
		tina: {
			mediaRoot: 'content/media',
			publicFolder: 'static'
		}
	},
	// See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
	schema: {
		collections: [
			{
				name: 'authors',
				label: 'Authors',
				path: 'static/content/authors',
				format: 'md',
				ui: {
					// Record `createdAt` and `lastUpdated` fields
					beforeSubmit: async ({
						form,
						cms,
						values
					}: {
						form: Form;
						cms: TinaCMS;
						values: Record<string, any>;
					}) => {
						if (form.crudType === 'create') {
							return {
								...values,
								createdAt: new Date().toISOString(),
								lastUpdated: new Date().toISOString()
							};
						}
					},
					// Enforce standard filename format
					filename: {
						readonly: true,
						slugify: (values) => {
							const name = values.name || 'unknown';
							const slug = name
								.toLowerCase()
								.trim()
								.replace(/[^a-z0-9\s-]/g, '')
								.replace(/\s+/g, '-')
								.slice(0, 36); // truncated

							return `${slug}.md`;
						}
					}
				},
				fields: [
					{ name: 'name', label: 'Name', type: 'string', isTitle: true, required: true },
					{ name: 'avatar', label: 'Profile Pic', type: 'image' },
					{ name: 'bio', label: 'Short Bio', type: 'rich-text', isBody: true }
				]
			},
			{
				name: 'posts',
				label: 'Posts',
				path: 'static/content/posts',
				format: 'md',
				ui: {
					filename: {
						readonly: true,
						slugify: (document) => {
							const date = new Date(document.date || Date.now());
							const yyyy = date.getFullYear();
							const mm = String(date.getMonth() + 1).padStart(2, '0');
							const dd = String(date.getDate()).padStart(2, '0');

							const title = document.title || 'untitled';
							const slug = title
								.toLowerCase()
								.trim()
								.replace(/[^a-z0-9\s-]/g, '')
								.replace(/\s+/g, '-')
								.slice(0, 36); // truncated

							return `${yyyy}-${mm}-${dd}-${slug}.md`;
						}
					}
				},
				fields: [
					{
						name: 'title',
						label: 'Title',
						type: 'string',
						isTitle: true,
						required: true
					},
					{
						name: 'authors',
						label: 'Authors',
						type: 'reference',
						collections: ['authors'],
						required: true
					},
					{
						name: 'date',
						label: 'Publication Date',
						type: 'datetime',
						required: true
					},
					{
						name: 'tags',
						label: 'Tags/Topics',
						type: 'string',
						list: true
					},
					{
						name: 'sponsored',
						label: 'Sponsored Article',
						type: 'boolean'
					},
					{
						name: 'image',
						label: 'Featured Image',
						type: 'image'
					},
					{
						name: 'summary',
						label: 'Summary',
						type: 'string',
						required: true
					},
					{
						name: 'body',
						label: 'Body',
						type: 'rich-text',
						required: true,
						isBody: true
					},
					{
						name: 'excerpt',
						label: 'Pull Quote',
						type: 'string'
					}
				]
			}
		]
	}
});
