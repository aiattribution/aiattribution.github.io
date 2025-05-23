<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PageContent } from '$lib';
	import { HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION } from '$lib/components/header/constants';
	import { headerNavItemSelectedStore } from '$lib/stores';

	let basicStatement: string = '';
	let statementToInterpret: string = '';

	onMount(() => {
		headerNavItemSelectedStore.setHeaderNavItemSelected(
			HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION,
			false
		);
		basicStatement = $page.params.slug;
		statementToInterpret = decodeStatementToInterpret();
	});

	const decodeStatementToInterpret = (): string => {
		return `${basicStatement.replace(/-/g, ' ')}${decodeModel()}`;
	};

	const decodeModel = (): string => {
		let model: string = $page.url.searchParams.get('model') || '';
		model = decodeURIComponent(model);

		const lastIndexDash: number = model.lastIndexOf('-');
		if (lastIndexDash !== -1) {
			model = model.slice(0, lastIndexDash) + ' ' + model.slice(lastIndexDash + 1);
		}

		return model;
	};
</script>

<PageContent {statementToInterpret} />

<style lang="scss">
</style>
