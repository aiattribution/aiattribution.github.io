<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PageContent } from '$lib';
	import { HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION } from '$lib/components/header/constants';
	import { headerNavItemSelectedStore } from '$lib/stores';

	let slug: string;
	let statementToInterpret: string = '';

	$: slug = $page.params.slug;
	$: statementToInterpret = slug.replace(/-/g, ' ');

	onMount(() => {
		headerNavItemSelectedStore.setHeaderNavItemSelected(
			HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION,
			false
		);
	});
</script>

<PageContent {statementToInterpret} />

<style lang="scss">
</style>
