<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { PageContent } from '$lib';
	import { headerNavItemSelectedStore } from '$lib/stores';

	const updatePageScroll = (): void => {
		if (typeof window !== 'undefined') {
			window.scrollTo(0, 0);
		}
	};

	$: $headerNavItemSelectedStore, updatePageScroll();
</script>

<PageContent />

<style lang="scss">
</style>
