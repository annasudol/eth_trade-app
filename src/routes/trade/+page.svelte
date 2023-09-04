<script>
  // @ts-nocheck
  import { onMount } from "svelte";
  import { afterUpdate } from "svelte";
  import {
    defaultEvmStores,
    web3,
    selectedAccount,
    connected,
    chainId,
  } from "svelte-web3";
  import { Spinner, Alert } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";

  export let message;
  const enableBrowser = () => defaultEvmStores.setBrowserProvider();

  $: checkAccount = $selectedAccount;
  $: balance = $connected ? $web3.eth.getBalance(checkAccount) : "";

  let amount = 0.1;
  let address = "0x0000000000000000000000000000000000000000";
  let alertMessage;
  let isLoading;
  let isError;
  let transactionHash;
  afterUpdate(() => {
    amount > balance ? (amount = balance) : amount;
    amount < 1 ? (amount = 1) : amount;
  });
  onMount(async () => {
    await defaultEvmStores.setProvider("https://rpc.slock.it/goerli");
    message = "";
  });
  const handleOnSubmit = async () => {
    let tx;
    try {
      isLoading = true;
      tx = await $web3.eth.sendTransaction({
        from: checkAccount,
        to: address,
        value: amount,
      });
    } catch (err) {
      isError = true;
      isLoading = false;
    } finally {
      console.log(tx.transactionHash, "tx");
      if (tx?.transactionHash) {
        isLoading = false;
        transactionHash = tx.transactionHash;
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
              <input
                type="text"
                id="address"
                placeholder="ETH address"
                bind:value={address}
                disabled={isLoading}
                class="disabled:opacity-75"
              />
            </div>

            <div class="form-section">
              <label for="amount">Amount in Gwei</label>
              <input
                type="number"
                id="amount"
                class="disabled:opacity-75"
                placeholder="2 gwei"
                disabled={isLoading}
                max={balance}
                min={1}
                bind:value={amount}
              />
            </div>
            <button
              type="submit"
              class="bg-blue-900 text-white disabled:opacity-75 disabled:bg-blue-900"
              disabled={isLoading}>Send</button
            >
          </form>
          {#if isLoading}
            <div class="flex flex-col items-center">
              <Spinner color="yellow" />
              <Alert border color="yellow">
                <InfoCircleSolid slot="icon" class="w-4 h-4" />
                <span class="font-medium">Transaction is sending</span>
                That might take a few seconds to complete
              </Alert>
            </div>
          {/if}
          {#if isError}
            <Alert border color="red">
              <InfoCircleSolid slot="icon" class="w-4 h-4" />
              <span class="font-medium">Error</span>
              Transaction Error
            </Alert>
          {/if}
          {#if transactionHash}
            <Alert border color="green">
              <InfoCircleSolid slot="icon" class="w-4 h-4" />
              <span class="font-medium">Success</span>
              `Transaction sent successfully, transactionHash: ${transactionHash}`
            </Alert>
          {/if}
        {:else}
          <p>you don't have enough money ;(</p>
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
