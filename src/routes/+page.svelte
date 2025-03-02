<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { onMount } from 'svelte';
	import Geolocation from 'svelte-geolocation';
	import type { GeolocationCoords } from 'svelte-geolocation/Geolocation.svelte';
	import { About, AttributionStatement, Header, TagLibrary } from '$lib';
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { apiService, utilsService } from '$lib/services';

	let isANewUser: boolean = false;
	let userId: string;
	let userGeolocationCoords: GeolocationCoords = [0, 0];

	let headerNavItemSelected: HeaderNavType = HeaderNavType.ATTRIBUTION_STATEMENT;

	onMount(() => {
		userId = localStorage.getItem('userId');
		if (!userId) {
			isANewUser = true;
			userId = utilsService.getUniqueId();
			localStorage.setItem('userId', userId);
		}
	});

	const onUserLocationRetrieved = (event: CustomEvent<Partial<GeolocationPosition>>): void => {
		if (isANewUser) {
			userGeolocationCoords[0] = event.detail.coords.longitude;
			userGeolocationCoords[1] = event.detail.coords.latitude;
			apiService.putUserLocation({
				longitude: userGeolocationCoords[0].toString(),
				latitude: userGeolocationCoords[1].toString()
			});
		}
	};
</script>

{#if isANewUser}
	<Geolocation getPosition on:position={onUserLocationRetrieved} />
{/if}

<div class="page-container">
	<Header bind:headerNavItemSelected />
	<div class="page-content">
		{#if headerNavItemSelected === HeaderNavType.ATTRIBUTION_STATEMENT}
			<AttributionStatement />
			<TagLibrary />
		{:else if headerNavItemSelected === HeaderNavType.ABOUT}
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
