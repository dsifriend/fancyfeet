<script lang="ts">
	import Footer from './footer.svelte';
	import Header from './header.svelte';

	import '../app.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="layout">
	<!-- Header -->
	<Header />

	<main>
		<!-- Black hole for other content -->
		{@render children?.()}
	</main>

	<!-- Footer -->
	<Footer />
</div>

<style>
	.layout {
		height: 100%;
		max-inline-size: 48em;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);
	}

	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
	}
</style>
