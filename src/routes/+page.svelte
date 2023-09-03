<script>
	// @ts-nocheck
	import { defaultEvmStores, web3, selectedAccount, connected, chainId } from 'svelte-web3';
	const enableBrowser = () => defaultEvmStores.setBrowserProvider();
	const disconnect = () => defaultEvmStores.disconnect();
	$: checkAccount = $selectedAccount;
	$: balance = $connected ? $web3.eth.getBalance(checkAccount) : '';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte app" />
</svelte:head>

<section class="main">
	{#if $web3.version}
		<button on:click={enableBrowser}>connect to Metamask</button>
	{/if}
	{#if $connected}
		<div>
			<p>
				Connected chain ID: {$chainId}
			</p>
			<p>
				Selected account: {$selectedAccount || 'not defined'}
			</p>
			<div>
				Balance:
				{#await balance}
					<span>waiting...</span>
				{:then value}
					<span>{value} gwei</span>
					<button on:click={disconnect}>Disconnect Metamask</button>
				{/await}
			</div>
		</div>
	{/if}
</section>

<style>
	.main {
		display: flex;
		justify-content: center;
	}
</style>
