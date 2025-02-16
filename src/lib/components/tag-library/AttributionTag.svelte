<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { TagTile } from '$lib';
	import type { AttributionTagI } from './interfaces';

	export let attributionTag: AttributionTagI;

	let isMobile: boolean = false;
	let currentIndex: number = 0;

	onMount(() => {
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	const checkScreenSize = (): void => {
		isMobile = window.matchMedia('(max-width: 480px)').matches;
	};

	const updateCurrentIndex = (index: number): void => {
		currentIndex = index;
	};
</script>

<div class="attribution-tag-container">
	<h2 class="attribution-tag-title">{attributionTag.name}</h2>
	{#if isMobile}
		<div class="carousel-wrapper">
			<div class="carousel" style={`--current-index: ${currentIndex};`}>
				{#each attributionTag.tags as tag (tag.id)}
					<div class="carousel-item">
						<TagTile {tag} />
					</div>
				{/each}
			</div>
		</div>
		<div class="carousel-navigator">
			{#each attributionTag.tags as _, index}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<img
					src={currentIndex === index
						? `${base}/carousel/selected-item.svg`
						: `${base}/carousel/unselected-item.svg`}
					alt="Carousel item"
					width="8"
					height="8"
					on:click={() => {
						updateCurrentIndex(index);
					}}
				/>
			{/each}
		</div>
	{:else}
		<div class="tiles-container">
			{#each attributionTag.tags as tag (tag.id)}
				<TagTile {tag} />
			{/each}
		</div>
	{/if}
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

	.carousel-wrapper {
		width: 100%;
		overflow: hidden;
	}

	.carousel {
		display: flex;
		align-items: stretch;
		width: 100%;
		transition: transform 0.5s ease-in-out;
		transform: translateX(calc(-1 * var(--current-index) * 100%));
	}

	.carousel-item {
		display: flex;
		align-items: stretch;
		min-width: 100%;
		flex: 0 0 100%;
	}

	.carousel-navigator {
		display: flex;
		justify-content: center;
		gap: 8px;
		width: 100%;
		margin-top: 8px;
	}
</style>
