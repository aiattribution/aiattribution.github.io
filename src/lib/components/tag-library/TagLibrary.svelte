<script lang="ts">
	import { AttributionTag } from '$lib';
	import { ATTRIBUTION_TAGS } from './constants';
	import type { AttributionTagI } from './interfaces';

	let attributionTags: AttributionTagI[] = ATTRIBUTION_TAGS;

	const copyLink = (): void => {
		const url: string = `${window.location.origin}${window.location.pathname}#component-library`;
		navigator.clipboard
			.writeText(url)
			.then(() => {
				console.log('Link copied:', url);
			})
			.catch((err) => {
				console.error('Error copying the link:', err);
			});
	};
</script>

<div id="component-library" class="section-container">
	<div class="component-library-title-and-text-container">
		<div class="component-library-title-container">
			<h1 class="section-title">Component library</h1>
			<!-- <LinkIcon on:iconClick={copyLink} /> -->
		</div>
		<p class="section-text">
			All possible components of an attribution statement can be found in this library.
		</p>
	</div>
	{#each attributionTags as attributionTag (attributionTag.id)}
		<AttributionTag {attributionTag} />
	{/each}
</div>

<style lang="scss">
	#component-library {
		scroll-margin-top: 3rem;
	}

	.section-container {
		gap: 2rem;
	}

	.component-library-title-and-text-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.component-library-title-container {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
