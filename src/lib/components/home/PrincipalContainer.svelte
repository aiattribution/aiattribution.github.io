<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, ButtonSet, Link } from 'carbon-components-svelte';
	import { HeaderNavType } from '$lib/components/header/interfaces';
	import { PrincipalContainerImage } from '.';

	export let headerNavItemSelected: HeaderNavType;

	let isMobileOrTablet: boolean = false;

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	const checkScreenSize = (): void => {
		isMobileOrTablet = window.matchMedia('(max-width: 1055px)').matches;
	};
</script>

<div class="principal-container">
	<div class="text-container">
		<h1 class="home-title">Detailed AI attribution for improved transparency</h1>
		{#if isMobileOrTablet}
			<PrincipalContainerImage />
		{/if}
		<p class="principal-container-text">
			An attribution statement identifies not only the presence of AI involvement, but also how AI
			was used. This approach makes important distinctions between different types and amounts of AI
			contributions, allowing creators to maintain ownership over co-created work and consumers to
			calibrate their trust.
		</p>
		<p class="principal-container-text">
			This tool was motivated by findings from our
			<Link class="paper-link" href="https://arxiv.org/pdf/2502.18357" target="_blank" inline>
				CHI 2025 paper
			</Link>.
		</p>
		<ButtonSet class="button-set">
			<Button
				kind="primary"
				on:click={() => {
					headerNavItemSelected = HeaderNavType.CREATE_ATTRIBUTION;
				}}
			>
				Create an attribution
			</Button>
			<Button
				kind="tertiary"
				on:click={() => {
					headerNavItemSelected = HeaderNavType.INTERPRET_ATTRIBUTION;
				}}
			>
				Interpret an attribution
			</Button>
		</ButtonSet>
	</div>
	{#if !isMobileOrTablet}
		<PrincipalContainerImage />
	{/if}
</div>

<style lang="scss">
	.principal-container {
		display: flex;
		gap: 15rem;
		background-color: #f0ebe1;
	}

	.text-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 40px 64px;
	}

	.home-title {
		font-family: IBM Plex Sans;
		font-weight: 300;
		font-size: 54px;
		line-height: 64px;
		letter-spacing: 0px;
	}

	.principal-container-text,
	:global(.paper-link) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
		color: var(--cds-text-01);
	}

	:global(.button-set) {
		gap: 8px;
	}

	:global(.button-set .bx--btn) {
		min-width: 229px !important;
	}

	:global(.button-set .bx--btn--primary) {
		background-color: #161616;
	}

	:global(.button-set .bx--btn--primary):hover {
		background-color: var(--cds-interactive-01);
	}

	:global(.button-set .bx--btn--tertiary) {
		border-color: #161616;
		color: #161616;
	}

	:global(.button-set .bx--btn--tertiary):hover {
		border-color: var(--cds-interactive-03, #0f62fe);
		color: white;
	}

	@media (max-width: 1055px) {
		.principal-container {
			flex-direction: column;
			gap: 1rem;
			padding: 20px;
		}

		.text-container {
			padding: 20px;
		}

		.home-title {
			font-size: 42px;
			line-height: 52px;
		}

		.principal-container-text,
		:global(.paper-link) {
			font-size: 14px !important;
			line-height: 20px !important;
		}
	}
</style>
