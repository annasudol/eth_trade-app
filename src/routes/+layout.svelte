<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/assets/scss/global.scss';
	import { isMenuOpen } from '$lib/assets/store';
</script>

<div class="layout" class:open={$isMenuOpen}>
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>
