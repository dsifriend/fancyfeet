<script lang="ts">
    import PostIndex from '$lib/components/PostIndex.svelte';
	import type { PostMetadata } from '$lib/types';
    import type { PageData } from '../$types';

    const { data } = $props<{ data: PageData }>();
    const allPosts = $derived(data.posts);
    const totalCount = $derived(data.totalCount);
    
    // Client-side pagination state
    const pageSize = data.pageSize;
    let currentPage = $state(1);

    const postsOnPage = $derived(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return allPosts.slice(start, end) as PostMetadata[];
    });

    const totalPages = $derived(Math.ceil(totalCount / pageSize));
    
    const nextPage = () => {
        if (currentPage < totalPages) currentPage++;
    }
    
    const prevPage = () => {
        if (currentPage > 1) currentPage--;
    }
</script>

<svelte:head>
    <title>Posts</title>
</svelte:head>

<h1>Mews Articles</h1>

<PostIndex posts={postsOnPage()} />

{#if totalPages > 1}
    <div class="pagination-controls" style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
        <button onclick={prevPage} disabled={currentPage === 1}>
            &larr; Previous
        </button>
        <span style="font-weight: bold;">Page {currentPage} of {totalPages}</span>
        <button onclick={nextPage} disabled={currentPage === totalPages}>
            Next &rarr;
        </button>
    </div>
{/if}
