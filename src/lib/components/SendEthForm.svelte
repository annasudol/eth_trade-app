<script>
  import { afterUpdate } from "svelte";
  import { web3, selectedAccount } from "svelte-web3";

  export let maxValue = [];
  let amount = 0;
  let address = "0x0000000000000000000000000000000000000000";
  afterUpdate(() => {
    amount > maxValue ? (amount = maxValue) : amount;
    amount < 0.01 ? (amount = 0.01) : amount;
  });
  async function handleOnSubmit() {
    if (web3 && selectedAccount) {
      // const tx = await $web3.eth.sendTransaction({
      //   gasLimit: $web3.utils.toHex($web3.utils.toWei('30', 'gwei')),
      //   from: $address,

      //   to: $address,
      //   value: $web3.utils.toHex($web3.utils.toWei("1", "finney")),
      // });
      console.log("Receipt from sendTip transaction", tx);
      alert("Thanks!");
    }
  }
</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <div class="form-section">
    <label for="address">Eth address</label>
    <input
      type="text"
      id="address"
      placeholder="ETH address"
      bind:value={address}
    />
  </div>

  <div class="form-section">
    <label for="amount">Amount</label>
    <input
      type="number"
      id="amount"
      placeholder="0.5"
      max={maxValue}
      min={0.01}
      bind:value={amount}
    />
  </div>
  <button type="submit">Send</button>
</form>
