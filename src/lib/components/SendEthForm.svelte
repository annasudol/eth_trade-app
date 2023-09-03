<script>
  export let maxValue = [];
</script>


<form on:submit|preventDefault>
  <div class="form-section">
    <label for="address">Eth address</label>
    <input type="text" id="address" placeholder="ETH address" />
  </div>

  <div class="form-section">
    <label for="amount">Amount</label>
    <input type="number" id="amount" placeholder="0.5" max={maxValue} />
  </div>

</form>
