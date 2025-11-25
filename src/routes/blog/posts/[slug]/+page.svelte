<script lang="ts">
    import type { PageData } from './$types';
    
    const { data } = $props<{ data: PageData }>();
    
    const post = $derived(data.post);
    const Content = $derived(data.content);
    
    // Note: The date is a Date object
</script>

<svelte:head>
    <title>{post.title}</title>
    <meta name="description" content={post.summary}>
</svelte:head>

<article style="width: 100%;">
    <hgroup>
      <h1>{post.title}</h1>
      <p>
        Published on <span class="date">{post.date.toLocaleDateString()}</span>
        by 
        <a href="/blog/authors#{post.author.slug}">
            {post.author.name}
        </a>
      </p>
    </hgroup>
    <ul>
      {#each post.tags as tag}
        <li style="display: inline; margin: 0.25em; padding: 0.25em; border-radius: 3em;" class="surface-4">#{tag}</li>
      {/each}
    </ul>
    {#if post.image}
    <!-- svelte-ignore a11y_missing_attribute -->
    <img src={post.image} style="width: 90%; display:block; margin-left:auto; margin-right:auto; margin-top: 1em;"/>
    {/if}
    <hr style="border: 0.3px solid var(--border); margin-top: 1rem;" />
    <div class="post-content">
      <Content />
    </div>
</article>

<style>
  .date {
		color: var(--text-2);
	}

  :global(.post-content) {
    font-size: 14pt;
    text-align: justify;
    text-justify: newspaper;
  }

  :global(.post-content img) {
    width: 90%;
    display:block;
    margin-left:auto;
    margin-right:auto;
    margin-top: 1em;
  }

  :global(.post-content ul) {
    list-style: disc;
    padding: 2rem;
  }
  :global(.post-content ol) {
    list-style: decimal-leading-zero;
    padding: 2rem;
  }
</style>
