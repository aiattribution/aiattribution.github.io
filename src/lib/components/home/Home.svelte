<script lang="ts">
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import {
		AnatomyAttributionStatement,
		PrincipalContainer,
		ShareYourFeedback,
		WhyIsThisNeeded
	} from '.';

	export let headerNavItemSelected: HeaderNavType;
</script>

<PrincipalContainer bind:headerNavItemSelected />
<AnatomyAttributionStatement />
<div class="center-content-container">
	<WhyIsThisNeeded />
	<ShareYourFeedback />
</div>

<style lang="scss">
	.center-content-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	:global(.center-content-container .section-container) {
		gap: 32px;
		padding: 32px 424px 0px;
	}
</style>
