<script lang="ts">
	import { Link, SkeletonPlaceholder } from 'carbon-components-svelte';
	import { MONDAY_FORM_EMBED_LINK } from '$lib/common/constants';

	let isIfraneLoading: boolean = true;

	const onLoad = (): void => {
		isIfraneLoading = false;
	};
</script>

<div class="section-container">
	<h1 class="section-title">Share your feedback</h1>
	<div class="feedback-container">
		<p class="section-text">
			This tool was created by designers, researchers, and developers at IBM Research. We are
			continuing to improve and expand on attribution approaches. Please share any suggestions,
			questions, or comments through
			<Link
				href="https://github.com/aiattribution/aiattribution.github.io/issues"
				target="_blank"
				inline
			>
				GitHub
			</Link> or this feedback form.
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
</div>

<style lang="scss">
	@media (max-width: 1055px) {
		.section-container {
			width: 100% !important;
		}
	}

	.feedback-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
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
