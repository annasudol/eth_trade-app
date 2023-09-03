<script>
// @ts-nocheck

  export let notification = {};
  // `onRemove` function will be passed into your component.
  export let onRemove = null;

  const handleButtonClick = () => {
    onRemove();
  };
</script>

<div class={notification.type === "error" ? "error" : ""}>
  <h4>{notification.heading}</h4>
  <p>{notification.description}</p>
  <button on:click={handleButtonClick}>Close me</button>
</div>
