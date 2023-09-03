<script>
  import { onMount } from "svelte";

  import {
    defaultEvmStores,
    web3,
    selectedAccount,
    connected,
    chainId,
    chainData,
  } from "svelte-web3";

  export let message;
  export let tipAddress;

  //   const enable = () =>
  //     defaultEvmStores.setProvider("https://sokol.poa.network");
  const enableBrowser = () => defaultEvmStores.setBrowserProvider();
  const disconnect = () => defaultEvmStores.disconnect();

  $: checkAccount =
    $selectedAccount || "0x0000000000000000000000000000000000000000";
  $: balance = $connected ? $web3.eth.getBalance(checkAccount) : "";
  const sendTip = async (e) => {
    console.log("Received move event (sendTip button)", e);
    const tx = await $web3.eth.sendTransaction({
      gasPrice: $web3.utils.toHex($web3.utils.toWei("30", "gwei")),
      gasLimit: $web3.utils.toHex("21000"),
      from: $selectedAccount,
      to: tipAddress,
      value: $web3.utils.toHex($web3.utils.toWei("1", "finney")),
    });
    console.log("Receipt from sendTip transaction", tx);
    alert("Thanks!");
  };

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
        Connected chain: {$chainId}
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
            <p>
              <button on:click={sendTip}
                >send 0.01 tip to {tipAddress} (author)</button
              >
            </p>
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
