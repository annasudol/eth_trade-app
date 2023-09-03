<script>
  import { onMount } from "svelte";
  import SendEthForm from "$lib/components/SendEthForm.svelte";

  import {
    defaultEvmStores,
    web3,
    selectedAccount,
    connected,
    chainId,
  } from "svelte-web3";

  export let message;

  const enableBrowser = () => defaultEvmStores.setBrowserProvider();
  const disconnect = () => defaultEvmStores.disconnect();

  $: checkAccount = $selectedAccount;
  $: balance = $connected ? $web3.eth.getBalance(checkAccount) : "";

  onMount(async () => {
    await defaultEvmStores.setProvider("https://rpc.slock.it/goerli");
    message = "";
  });
</script>

<svelte:head>
  <title>svelte-web3 test</title>
</svelte:head>

<div class="main">
  {#if $web3.version}
    <p>
      <button on:click={enableBrowser}>connect to Metamask</button>
    </p>
  {/if}
  {#if $connected}
    <div>
      <p>
        Connected chain ID: {$chainId}
      </p>
      <p>
        Selected account: {$selectedAccount || "not defined"}
      </p>

      <p>
        Balance:
        {#await balance}
          <span>waiting...</span>
        {:then value}
          <span>{value}</span>
          <button on:click={disconnect}>Disconnect Metamask</button>

          {#if value > 0 && $selectedAccount}
            <SendEthForm maxValue={value} />
          {/if}
        {/await}
      </p>
    </div>
  {/if}
</div>

<style>
  .main {
    display: flex;
    justify-content: center;
  }
</style>
