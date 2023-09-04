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
	let alertMessage;
	afterUpdate(() => {
		amount > balance ? (amount = balance) : amount;
		amount < 1 ? (amount = 1) : amount;
	});
	onMount(async () => {
		await defaultEvmStores.setProvider('https://rpc.slock.it/goerli');
		message = '';
	});
	const handleOnSubmit = async () => {
		let tx;
		try {
			alertMessage = 'Transaction is sending';
			tx = await $web3.eth.sendTransaction({
				from: checkAccount,
				to: address,
				value: amount
			});
		} catch (err) {
			alertMessage = err.message || 'Error with making transaction'
		} finally {
			if(tx.blockHash, tx.transactionHash) {
				alertMessage =`Transaction sent successfully, transactionHash: ${tx.transactionHash}`
			}

		}
	};
</script>

<svelte:head>
	<title>svelte-web3 trade</title>
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
							<label for="amount">Amount in Gwei</label>
							<input
								type="number"
								id="amount"
								placeholder="2 gwei"
								max={balance}
								min={1}
								bind:value={amount}
							/>
						</div>
						<button type="submit">Send</button>
					</form>
					{:else}
					<p>you don't have enough money ;(</p>

					{#if alertMessage} 
						<p>{alertMessage}</p>
					{/if}
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
