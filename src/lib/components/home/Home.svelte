<script lang="ts">
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { AnatomyAttributionStatement, PrincipalContainer, ShareYourFeedback } from '.';

	export let headerNavItemSelected: HeaderNavType;
</script>

<PrincipalContainer bind:headerNavItemSelected />
<AnatomyAttributionStatement />
<ShareYourFeedback />

<style lang="scss">
</style>
