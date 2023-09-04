<script>
  // @ts-nocheck
  import {
    defaultEvmStores,
    web3,
    selectedAccount,
    connected,
    chainId,
  } from "svelte-web3";

  import { networks } from "$lib/config";
  const enableBrowser = () => defaultEvmStores.setBrowserProvider();
  const disconnect = () => defaultEvmStores.disconnect();
  $: checkAccount = $selectedAccount;
  $: balance = $connected ? $web3.eth.getBalance(checkAccount) : "";
  $: networkName = networks[Number($chainId)]?.name;
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte app" />
</svelte:head>

<section class="flex justify-center">
  {#if $web3.version}
    <button on:click={enableBrowser}>connect to Metamask</button>
  {/if}
  {#if $connected}
    <div>
      <p>Connected chain ID: {$chainId}, Name: {networkName}</p>
      <p>Selected account: {$selectedAccount || "not defined"}</p>
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
