<script lang="ts">
	import { Tile } from 'carbon-components-svelte';
	import type { TagI } from '$lib/models/tag-library';

	export let tag: TagI;
</script>

<Tile class="tag-tile">
	<div class="tag-title">
		{tag.name}
	</div>
	<div class="abbreviation-and-explanation-container">
		<div>
			<div class="label">Abbreviation</div>
			<div class="text">
				{tag.abbreviation}
			</div>
		</div>
		<div>
			<div class="label">Explanation</div>
			<div class="text">
				{tag.explanation}
			</div>
		</div>
	</div>
	<div class="icon-container">
		<svelte:component this={tag.iconComponent} />
	</div>
</Tile>

<style lang="scss">
	:global(.tag-tile) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
		width: 360px;
		min-width: 360px;
		margin: 1px;
		padding: 1rem;
	}

	.tag-title {
		font-family: IBM Plex Sans;
		font-weight: 600;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	.abbreviation-and-explanation-container {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin-bottom: 1rem;
	}

	.label {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.32px;
	}

	.text {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	.icon-container {
		margin-top: auto;
	}

	@media (max-width: 1055px) {
		:global(.tag-tile) {
			width: calc(50% - 2px);
			min-width: auto;
		}
	}

	@media (max-width: 480px) {
		:global(.tag-tile) {
			width: 100%;
			min-width: auto;
		}
	}
</style>
