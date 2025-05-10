<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { Loading } from 'carbon-components-svelte';
	import { PageContent } from '$lib';
	import { HEADER_NAV_ITEM_HOME } from '$lib/components/header/constants';
	import { headerNavItemSelectedStore } from '$lib/stores';

	let isLoading: boolean = true;

	onMount(() => {
		setTimeout(() => {
			isLoading = false;
			headerNavItemSelectedStore.setHeaderNavItemSelected(HEADER_NAV_ITEM_HOME);
		}, 500);
	});
</script>

{#if isLoading}
	<div class="page-container">
		<div class="page-content">
			<Loading />
		</div>
	</div>
{:else}
	<PageContent />
{/if}

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
