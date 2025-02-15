<script lang="ts">
	import { SkeletonPlaceholder } from 'carbon-components-svelte';
	import { MONDAY_FORM_EMBED_LINK } from '$lib/common/constants';

	let isIfraneLoading: boolean = true;

	const onLoad = (): void => {
		isIfraneLoading = false;
	};
</script>

<div class="section-container">
	<h1 class="section-title">About this toolkit</h1>
	<p class="section-text">
		This toolkit was created by the Human-AI Collaboration team at IBM Research.
	</p>
	<p class="section-text">
		<span>
			The attribution statement was inspired by the Creative Commons license and motivated by our
			research findings on users’ transparency needs in co-created work. This research is described
			in our paper, published at CHI 2025:
		</span>
		<br />
		<span>
			“Which Contributions Deserve Credit? Perceptions of Attribution in Human-AI Co-Creation”
		</span>
	</p>
	<p class="section-text">
		This toolkit is still in beta, and we are continuing to improve and expand it. If you have any
		feedback, suggestions, questions, or comments, we would love to hear it.
	</p>
	<div class="iframe-container">
		{#if isIfraneLoading}
			<SkeletonPlaceholder class="iframe-skeleton-placeholder" />
		{/if}
		<iframe
			title="AI Attribution Feedback"
			class:iframe-loading={isIfraneLoading}
			src={MONDAY_FORM_EMBED_LINK}
			width="100%"
			height="100%"
			on:load={onLoad}
		></iframe>
	</div>
</div>

<style lang="scss">
	.section-container {
		width: 50% !important;
	}

	@media (max-width: 1055px) {
		.section-container {
			width: 100% !important;
		}
	}

	.iframe-container {
		width: 100%;
		height: 730px;
	}

	.iframe-loading {
		display: none;
	}

	:global(.iframe-skeleton-placeholder) {
		width: 100%;
		height: 100%;
	}
</style>
