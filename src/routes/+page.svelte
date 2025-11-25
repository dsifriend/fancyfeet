<script lang="ts">
	import PostIndex from '$lib/components/PostIndex.svelte';
	import type { PageData } from './$types';

	const { data } = $props<{ data: PageData }>();
	const latestPost = $derived(data.latestPost);
	const recentPosts = $derived(data.recentPosts);
</script>

<h1>Latest Mews</h1>
<section>
	<article class="post" style="width: 100%; margin-bottom: 1.5rem;">
    <hgroup>
      <h2 class="title">{latestPost.title}</h2>
      <p>
        Published on <span class="date">{latestPost.date.toLocaleDateString()}</span>
        by 
        <a href="/blog/authors/{latestPost.author.slug}">
            {latestPost.author.name}
        </a>
      </p>
    </hgroup>
    <ul>
      {#each latestPost.tags as tag}
        <li style="display: inline; margin: 0.25em; padding: 0.25em; border-radius: 3em;" class="surface-4">#{tag}</li>
      {/each}
    </ul>
    {#if latestPost.image}
    <!-- svelte-ignore a11y_missing_attribute -->
    <img src={latestPost.image} style="width: 90%; display:block; margin-left:auto; margin-right:auto; margin-top: 1em;"/>
    {/if}
    <h3>{latestPost.summary}</h3>
		<a href="/blog/posts/{latestPost.slug}">Read more…</a>
	</article>
</section>
{#if recentPosts && recentPosts.length > 0}
<hr style="border: 0.3px solid var(--border); margin-top: 1rem;" />
<section>
    <h2>Recent Posts</h2>
    <PostIndex posts={recentPosts} />
    <p style="margin-top: 1.5rem;">
        <a href="/blog">View All Posts &rarr;</a>
    </p>
</section>
{/if}

<style>
	.title {
		font-size: var(--font-size-fluid-1);
	}

	.date {
		color: var(--text-2);
	}
</style>
