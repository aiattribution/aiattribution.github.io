<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { PUBLIC_UMAMI_SRC, PUBLIC_UMAMI_WEBSITE_ID } from '$env/static/public';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import { onMount } from 'svelte';
	import { PageContent } from '$lib';
	import { HeaderNavType } from '$lib/components/header/interfaces';

	let isProduction: boolean = false;
	let headerNavItemSelected: HeaderNavType = HeaderNavType.HOME;

	onMount(() => {
		isProduction = import.meta.env.MODE === 'production';
	});

	const updatePageScroll = (): void => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
	};

	$: headerNavItemSelected, updatePageScroll();
</script>

{#if isProduction}
	<UmamiAnalytics websiteID={PUBLIC_UMAMI_WEBSITE_ID} srcURL={PUBLIC_UMAMI_SRC} />
{/if}

<PageContent bind:headerNavItemSelected />

<style lang="scss">
</style>
