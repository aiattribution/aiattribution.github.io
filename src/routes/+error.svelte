<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { Loading } from 'carbon-components-svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto('/');
	});
</script>

<div class="page-container">
	<div class="page-content">
		<Loading />
	</div>
</div>

<style lang="scss">
	.page-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
		margin: 0;
	}

	.page-content {
		display: flex;
		flex-direction: column;
		position: relative;
		flex-grow: 1;
		width: 100%;
		margin: 0;
	}
</style>
