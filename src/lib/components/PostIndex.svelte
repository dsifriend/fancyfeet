<script lang="ts">
  import type { PostMetadata } from '$lib/types';
  
  const { posts } = $props<{ posts: PostMetadata[] }>();
</script>

<div class="post-index">
  {#each posts as post (post.slug)}
  <div class="post-entry">
  {#if post.image}
  <!-- svelte-ignore a11y_missing_attribute -->
  <img src={post.image}/>
  {:else}
  <img src="/images/catpaw.svg" alt="FancyFeet.Cat Logo"/>
  {/if}
  <section class="post-summary">
    <h2>
      <a href="/blog/posts/{post.slug}" class="post-link">
        {post.title}
      </a>
    </h2>
    <div class="metadata">
      <span class="date">{post.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
      <span class="separator">|</span>
      <span class="author">
        By <a href="/blog/authors#{post.author.slug}" class="author-link">{post.author.name}</a>
      </span>
      {#if post.sponsored}
        <span class="sponsored-tag">| Sponsored</span>
      {/if}
    </div>
    <p class="summary">{post.summary}</p>

    {#if post.tags && post.tags.length}
      <div class="tags">
        {#each post.tags as tag}
          <span class="tag surface-4">#{tag}</span>
        {/each}
      </div>
    {/if}
  </section>
  </div>
  {/each}
</div>

<style>
  .post-index {
    display: flex;
    flex-direction: column;
    align-items: first baseline;
    justify-content: flex-start;
  }
  .post-entry img {
    width: 8rem;
    margin-right: 1rem;
    height: min-content;
  }
  .post-entry {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .post-summary {
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
  .post-summary:last-child { border-bottom: none; }
  h2 { margin: 0 0 0.25rem 0; font-size: 1.5em; }
  .metadata { font-size: 0.9em; margin-bottom: 0.5rem; }
  .separator { padding: 0 0.5rem; }
  .summary { margin: 0.5rem 0; }
  .sponsored-tag { color: var(--purple-4); font-weight: bold; margin-left: 0.5rem; }
  .tag {
    margin-right: 0.25em;
    padding: 0.25em;
    border-radius: 3em;
    font-size: 0.8rem;
  }

  @media (min-width: 768px) {
    .post-index img {
      width: 12rem;
    }
  }
</style>
