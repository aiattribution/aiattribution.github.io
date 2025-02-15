<script lang="ts">
	import { base } from '$app/paths';
	import { Tile } from 'carbon-components-svelte';
	import type { AttributionTagI } from './interfaces';

	export let attributionTag: AttributionTagI;
</script>

<div class="attribution-tag-container">
	<h2 class="attribution-tag-title">{attributionTag.name}</h2>
	<div class="tiles-container">
		{#each attributionTag.tags as tag (tag.id)}
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
					<img src={`${base}${tag.icon}`} alt={tag.name} width="24" height="24" />
				</div>
			</Tile>
		{/each}
	</div>
</div>

<style lang="scss">
	.attribution-tag-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.attribution-tag-title {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0px;
	}

	.tiles-container {
		display: flex;
		flex-wrap: wrap;
		align-items: stretch;
	}

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
</style>
