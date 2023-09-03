<script>
	import { navItems } from '$lib/config';
	import NavItem from './NavItem.svelte';
</script>

<footer>
	<nav>
		<ul>
			{#each navItems as page}
				<NavItem href={page.route}>
					{page.title}
				</NavItem>
			{/each}
		</ul>
	</nav>
	<p>&copy; Anna Sudol {new Date().getFullYear()}</p>
</footer>
