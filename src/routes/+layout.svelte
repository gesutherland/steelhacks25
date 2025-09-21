<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import Footer from '$lib/components/Footer.svelte';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<div class="min-h-screen flex-grow">
		{@render children?.()}
	</div>

	<Footer></Footer>
</div>