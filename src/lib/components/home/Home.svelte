<script lang="ts">
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { PaperSectionContainer, PrincipalContainer, ShareYourFeedback } from '.';

	export let headerNavItemSelected: HeaderNavType;
</script>

<PrincipalContainer bind:headerNavItemSelected />
<PaperSectionContainer />
<ShareYourFeedback />

<style lang="scss">
</style>
