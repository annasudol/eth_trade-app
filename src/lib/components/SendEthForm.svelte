<script>
  import { afterUpdate } from "svelte";

  export let maxValue = [];
  let amount = 0;
  afterUpdate(() => {
    amount > maxValue ? (amount = maxValue) : amount;
    amount < 0.01 ? (amount = 0.01) : amount;

  });
  function handleOnSubmit() {console.log(
  "I'm the handleOnSubmit() in App.svelte"
)}

</script>

<form on:submit|preventDefault={handleOnSubmit}>
  <div class="form-section">
    <label for="address">Eth address</label>
    <input type="text" id="address" placeholder="ETH address" />
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
