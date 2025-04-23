<script lang="ts">
	import { createEventDispatcher, type EventDispatcher } from 'svelte';

	let dispatch: EventDispatcher<any> = createEventDispatcher();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svg
	width="8"
	height="8"
	viewBox="0 0 8 8"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	on:click={() => {
		dispatch('itemClick');
	}}
>
	<circle cx="4" cy="4" r="4" fill="#A8A8A8" />
</svg>
