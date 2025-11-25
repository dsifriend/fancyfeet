<script lang="ts">
	import * as config from '$lib/config';
</script>

<nav>
	<!-- Title -->
	<a href="/" class="title">
		<img src="/images/catpaw.svg" alt="a pink stylized cat paw" />
		<b>{config.title}</b>
	</a>

	<!-- Navigation -->
	<ul class="links">
		<li>
			<a href="/blog/posts">Posts</a>
		</li>
		<li>
			<a href="/blog/authors">Members</a>
		</li>
		<li>
			<a href="/about">About</a>
		</li>
		<li>
			<a href="/contact">Contact</a>
		</li>
		<li>
			<a href="/rss.xml" target="_blank">RSS</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
	}

	.title {
		display: flex;
		align-items: center;
		color: var(--pink-6);
	}

	.title > img {
		max-height: 1.5lh;
		margin: 1mm;
	}

	.links {
		margin-block: var(--size-7);
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	@media (min-width: 768px) {
		.links {
			display: flex;
			gap: var(--size-7);
		}
	}
</style>
