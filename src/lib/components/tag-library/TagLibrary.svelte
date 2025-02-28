<script lang="ts">
	import { AttributionTag, LinkIcon } from '$lib';
	import { ATTRIBUTION_TAGS } from './constants';
	import type { AttributionTagI } from './interfaces';

	let attributionTags: AttributionTagI[] = ATTRIBUTION_TAGS;

	const copyLink = (): void => {
		const url: string = `${window.location.origin}${window.location.pathname}#tag-library`;
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

<div id="tag-library" class="section-container">
	<div class="tag-library-title-and-text-container">
		<div class="tag-library-title-container">
			<h1 class="section-title">Tag library</h1>
			<LinkIcon on:iconClick={copyLink} />
		</div>
		<p class="section-text">
			Reference the library to understand the components of an attribution tag.
		</p>
	</div>
	{#each attributionTags as attributionTag (attributionTag.id)}
		<AttributionTag {attributionTag} />
	{/each}
</div>

<style lang="scss">
	#tag-library {
		scroll-margin-top: 3rem;
	}

	.section-container {
		gap: 2rem;
	}

	.tag-library-title-and-text-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.tag-library-title-container {
		display: flex;
		align-items: center;
		gap: 10px;
	}
</style>
