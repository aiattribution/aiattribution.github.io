<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { PageContent } from '$lib';
	import { HeaderNavType } from '$lib/components/header/interfaces';

	let headerNavItemSelected: HeaderNavType = HeaderNavType.HOME;

	const updatePageScroll = (): void => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
	};

	$: headerNavItemSelected, updatePageScroll();
</script>

<PageContent bind:headerNavItemSelected />

<style lang="scss">
</style>
