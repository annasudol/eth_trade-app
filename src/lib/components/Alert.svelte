<script>
// @ts-nocheck

  import { Alert } from 'flowbite-svelte';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';

	export const message;
	export const description;
    export const color;
</script>

<Alert {color}>
  <InfoCircleSolid slot="icon" class="w-4 h-4" />
  <span class="font-medium">{message}</span>
  {description}
</Alert>
