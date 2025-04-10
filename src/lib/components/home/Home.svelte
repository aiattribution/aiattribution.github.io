<script lang="ts">
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import {
		AnatomyAttributionStatement,
		HowToUseAnAttributionStatement,
		PrincipalContainer,
		ShareYourFeedback,
		WhyIsThisNeeded
	} from '.';

	export let headerNavItemSelected: HeaderNavType;
</script>

<PrincipalContainer bind:headerNavItemSelected />
<AnatomyAttributionStatement />
<div class="center-content-container">
	<HowToUseAnAttributionStatement />
	<WhyIsThisNeeded />
	<ShareYourFeedback />
</div>

<style lang="scss">
	.center-content-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
		margin-top: 32px;
	}

	:global(.center-content-container .section-container) {
		padding: 32px 25% 0px;
	}

	@media (max-width: 1055px) {
		.center-content-container {
			gap: unset !important;
			margin-top: unset !important;
		}

		:global(.center-content-container .section-container) {
			padding: 32px 16px 0px;
		}
	}
</style>
