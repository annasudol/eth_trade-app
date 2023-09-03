<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';

	import { defaultEvmStores, web3, selectedAccount, connected, chainId } from 'svelte-web3';

	export let message;
	const enableBrowser = () => defaultEvmStores.setBrowserProvider();

	$: checkAccount = $selectedAccount;
	$: balance = $connected ? $web3.eth.getBalance(checkAccount) : '';

	let amount = 0.1;
	let address = '0x0000000000000000000000000000000000000000';
	let isLoading;
	afterUpdate(() => {
		amount > balance ? (amount = balance) : amount;
		amount < 0.01 ? (amount = 0.01) : amount;
	});
	onMount(async () => {
		await defaultEvmStores.setProvider('https://rpc.slock.it/goerli');
		message = '';
	});
	const handleOnSubmit = async () => {
		let tx;
		try {
			isLoading = true;
			tx = await $web3.eth.sendTransaction({
				from: '0xa5e672a0fca1dd75561a741a459d630fa640e232',
				to: '0x0000000000000000000000000000000000000000',
				value: 10
			});
			console.log(tx.blockHash, tx.transactionHash);
		} catch (err) {
			alert('Error with making transaction');
		}
	};
</script>

<svelte:head>
	<title>svelte-web3 test</title>
</svelte:head>

<div class="trade">
	{#if $web3.version}
		<p>
			<button on:click={enableBrowser}>connect to Metamask</button>
		</p>
	{/if}
	{#if $connected}
		<div>
			{#await balance}
				<span>waiting...</span>
			{:then value}
				{#if value > 0 && $selectedAccount}
					<form on:submit|preventDefault={handleOnSubmit}>
						<div class="form-section">
							<label for="address">Eth address</label>
							<input type="text" id="address" placeholder="ETH address" bind:value={address} />
						</div>

						<div class="form-section">
							<label for="amount">Amount</label>
							<input
								type="number"
								id="amount"
								placeholder="2 gwei"
								max={balance}
								min={0.01}
								bind:value={amount}
							/>
						</div>
						<button type="submit">Send</button>
					</form>
				{/if}
			{/await}
		</div>
	{/if}
</div>

<style>
	.trade {
    width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
