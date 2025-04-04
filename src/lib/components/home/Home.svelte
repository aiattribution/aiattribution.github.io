<script lang="ts">
	import { Button, ButtonSet } from 'carbon-components-svelte';
	import { HeaderNavType } from '$lib/components/header/interfaces';

	export let headerNavItemSelected: HeaderNavType;
</script>

<div class="principal-container">
	<div class="text-container">
		<h1 class="home-title">Detailed AI attribution for improved transparency</h1>
		<p class="principal-container-text">
			An attribution statement identifies not only the presence of AI involvement, but also how AI
			was used. This approach makes important distinctions between different types and amounts of AI
			contributions, allowing creators to maintain ownership over co-created work and consumers to
			calibrate their trust.
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
	<div class="image-container">
		<img
			class="co-created-attribution-image"
			src="DALL-E Human-AI Attribution Illustration.png"
			alt="Co-created attribution"
		/>
		<div class="image-attribution-statement">AIA PAI DALL-E Nc Hin R 1.0</div>
	</div>
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
		padding: 40px 64px;
	}

	.image-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 40px;
	}

	.home-title {
		font-family: IBM Plex Sans;
		font-weight: 300;
		font-size: 54px;
		line-height: 64px;
		letter-spacing: 0px;
		margin-bottom: 32px;
	}

	.principal-container-text {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	.co-created-attribution-image {
		box-shadow: 10px 10px 20px 0px #00000040;
	}

	.image-attribution-statement {
		display: flex;
		width: fit-content;
		padding: 8px 16px;
		margin-top: -17px;
		background-color: #514c46;
		font-family: IBM Plex Sans;
		font-weight: 500;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
		color: #ffffff;
	}

	:global(.button-set) {
		gap: 8px;
		margin-top: 64px;
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
</style>
