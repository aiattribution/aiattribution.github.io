<script lang="ts">
	import { AttributionTag } from '$lib';
	import { ATTRIBUTION_TAGS } from './constants';
	import type { AttributionTagI } from './interfaces';

	let attributionTags: AttributionTagI[] = ATTRIBUTION_TAGS;
</script>

<div class="section-container">
	<h1 class="section-title">Tag library</h1>
	<p class="section-text">
		Reference the library to understand the components of an attribution tag.
	</p>
	{#each attributionTags as attributionTag (attributionTag.id)}
		<AttributionTag {attributionTag} />
	{/each}
</div>

<style lang="scss"></style>
