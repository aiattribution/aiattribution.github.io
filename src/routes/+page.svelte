<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import { About, AttributionStatement, Header, Home, TagLibrary } from '$lib';
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { apiService, utilsService } from '$lib/services';

	let isANewUser: boolean = false;
	let userId: string;

	let headerNavItemSelected: HeaderNavType = HeaderNavType.HOME;

	onMount(() => {
		userId = localStorage.getItem('userId');
		if (!userId) {
			isANewUser = true;
			apiService.updateNumberOfUniqueSiteVisitors();
			userId = utilsService.getUniqueId();
			localStorage.setItem('userId', userId);
		}
	});
</script>

<div class="page-container">
	<Header bind:headerNavItemSelected />
	<div class="page-content">
		{#if headerNavItemSelected === HeaderNavType.HOME}
			<Home />
		{:else if headerNavItemSelected === HeaderNavType.CREATE_ATTRIBUTION}
			<AttributionStatement />
			<TagLibrary />
		{:else if headerNavItemSelected === HeaderNavType.INTERPRET_ATTRIBUTION}
			<About />
		{/if}
		<div class="footer"></div>
	</div>
</div>

<style lang="scss">
	@import '../styles/utils.scss';
	$header-height: 3rem;

	.page-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-height: 100vh;
		margin: 0;
	}

	.page-content {
		display: flex;
		flex-direction: column;
		position: relative;
		top: $header-height;
		flex-grow: 1;
		width: 100%;
		margin: 0;
	}

	.footer {
		width: 100%;
		height: 56px;
	}

	:global(.section-container) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 0px $section-container-margin-left-right;
		padding-top: 32px;
	}

	:global(.section-title) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 28px;
		line-height: 36px;
		letter-spacing: 0px;
	}

	:global(.section-text) {
		font-family: IBM Plex Sans;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	@media (max-width: 1055px) {
		:global(.section-container) {
			padding: 0px 16px;
			padding-top: 32px;
		}
	}
</style>
