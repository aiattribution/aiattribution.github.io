<script lang="ts">
	import { base } from '$app/paths';
	import { AttributionTag } from '$lib';
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
	<div class="tag-library-title-container">
		<h1 class="section-title">Tag library</h1>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			class="link-icon"
			src={`${base}/link-icon.svg`}
			alt="Link"
			width="28"
			height="28"
			on:click={copyLink}
		/>
	</div>
	<p class="section-text">
		Reference the library to understand the components of an attribution tag.
	</p>
	{#each attributionTags as attributionTag (attributionTag.id)}
		<AttributionTag {attributionTag} />
	{/each}
</div>

<style lang="scss">
	#tag-library {
		scroll-margin-top: 3rem;
	}

	.tag-library-title-container {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.link-icon:hover {
		cursor: pointer;
	}
</style>
