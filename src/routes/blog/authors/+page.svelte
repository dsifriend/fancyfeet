<script lang="ts">
    import type { PageData } from './$types';
    
    const { data } = $props<{ data: PageData }>();

    const authors = $derived(data.authors);
</script>

<svelte:head>
    <title>Members</title>
    <meta name="description" content="Writers for FancyFeet.Cat"/>
</svelte:head>

<h1>Members of The&nbsp;Society for Fancy Cat Feet</h1>

{#each authors as author, i (author.slug)}
    <section 
        id={author.slug} 
        style="width: 100%; margin-bottom: 3rem; padding-top: 1rem;
            border-top: 1px solid var(--border);"
    >
        <div>
            {#if author.avatar}
                <img
                    src={author.avatar}
                    alt="{author.name}'s portrait"
                    class="portrait"
                    style="float: {i % 2 === 0 ? 'left' : 'right'};"
                />
            {/if}
            <h2>{author.name}</h2>
        </div>
        
        <div style="text-align: justify;">
          <author.content />
        </div>
    </section>
{/each}

<style>
  .portrait {
    width: 6rem;
    margin-right: 1em; border-radius: 50%;
    object-fit: cover;
  }

@media (min-width: 768px) {
        .portrait {
            width: 12rem;
        }
    }
</style>
