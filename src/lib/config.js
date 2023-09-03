/**
 * All of these values are used throughout the site – for example,
 * in the <meta> tags, in the footer, and in the RSS feed.
 *
 * PLEASE BE SURE TO UPDATE THEM ALL! Thank you!
 **/

export const siteTitle = 'Liquidity pool';
export const siteDescription = 'Ethereum Liquidity pool and Staking build on Svelte';
export const siteURL = 'example.com';
export const siteLink = 'https://github.com/annasudol/liquidity_pool_staking_svelte';

// Controls how many posts are shown per page on the main blog index pages
export const postsPerPage = 10;

// Edit this to alter the main nav menu. (Also used by the footer and mobile nav.)
export const navItems = [
	{
		title: 'Swap',
		route: '/'
	},
	{
		title: 'Account',
		route: '/account'
	}
];
