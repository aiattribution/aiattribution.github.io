<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { PageContent } from '$lib';
	import { HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION } from '$lib/components/header/constants';
	import { headerNavItemSelectedStore } from '$lib/stores';

	onMount(() => {
		headerNavItemSelectedStore.setHeaderNavItemSelected(HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION);
	});
</script>

<PageContent />

<style lang="scss">
</style>
