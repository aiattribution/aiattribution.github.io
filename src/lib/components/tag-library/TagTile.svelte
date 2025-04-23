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
	@use '@carbon/type';

	:global(.tag-tile) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1rem;
		width: 360px;
		min-width: 360px;
		padding: 1rem;
		border: 1px solid #ffffff;
	}

	.tag-title {
		@include type.type-style('productive-heading-02');
	}

	.abbreviation-and-explanation-container {
		display: flex;
		flex-direction: column;
		gap: 18px;
		margin-bottom: 1rem;
	}

	.label {
		@include type.type-style('label-01');
	}

	.text {
		@include type.type-style('body-short-02');
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
