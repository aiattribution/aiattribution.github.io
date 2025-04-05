<script lang="ts">
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { PaperSectionContainer, PrincipalContainer } from '.';

	export let headerNavItemSelected: HeaderNavType;
</script>

<PrincipalContainer bind:headerNavItemSelected />
<PaperSectionContainer />

<style lang="scss">
</style>
