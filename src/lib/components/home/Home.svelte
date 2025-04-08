<script lang="ts">
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { AnatomyAttributionStatement, PrincipalContainer, ShareYourFeedback } from '.';

	export let headerNavItemSelected: HeaderNavType;
</script>

<PrincipalContainer bind:headerNavItemSelected />
<AnatomyAttributionStatement />
<div class="center-content-container">
	<ShareYourFeedback />
</div>

<style lang="scss">
	:global(.center-content-container .section-container) {
		gap: 32px;
		padding: 32px 424px 0px;
	}
</style>
