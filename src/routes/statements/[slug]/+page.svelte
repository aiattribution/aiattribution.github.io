<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { page } from '$app/stores';
	import { PageContent } from '$lib';
	import { HeaderNavType } from '$lib/components/header/interfaces';

	let headerNavItemSelected: HeaderNavType = HeaderNavType.INTERPRET_ATTRIBUTION;

	let slug: string;
	let statementToInterpret: string = '';

	$: slug = $page.params.slug;
	$: statementToInterpret = slug.replace(/-/g, ' ');
</script>

<PageContent bind:headerNavItemSelected {statementToInterpret} />

<style lang="scss">
</style>
