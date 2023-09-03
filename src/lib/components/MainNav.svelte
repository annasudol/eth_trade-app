<script>
	import { navItems } from '$lib/config';
	import { isMenuOpen } from '$lib/assets/store';
	import NavItem from './NavItem.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
</script>

<nav class="main-nav" class:open={$isMenuOpen}>
	<ul>
		{#each navItems as page}
			<NavItem href={page.route}>
				{page.title}
			</NavItem>
		{/each}
	</ul>
	<HamburgerMenuButton closeOnly={true} />
</nav>
