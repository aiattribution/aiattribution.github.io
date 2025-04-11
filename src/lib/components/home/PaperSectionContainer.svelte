<script lang="ts">
	import { Link } from 'carbon-components-svelte';
</script>

<div class="paper-section-container">
	<div class="text-container">
		<p class="text">
			As generative AI use becomes more widespread and complex, new forms of transparency are needed
			to provide more granularity into how AI contributed to a work. For example, in a co-written
			article, was AI used to make minor wording revisions or generate new ideas? Did AI produce the
			majority of the article, or did it only modify a few sentences?
		</p>
		<p class="text">
			Generic disclosures, e.g., “assisted by AI,” are no longer sufficient. Our goal is to develop
			open-source, detailed AI attribution methods that accurately represent creators’ ownership
			perceptions and provide consumers with more transparency to calibrate their trust. One
			approach we’ve devised is an attribution statement, inspired by the Creative Commons license
			and motivated by our research on users’ transparency needs in co-created work.
		</p>
	</div>
	<div class="paper-image-container">
		<img class="co-created-attribution-image" src="home-images/paper-image.png" alt="Paper" />
		<div class="rectangle"></div>
		<p class="paper-description-text">
			To learn more about this research, see our
			<Link href="https://arxiv.org/pdf/2502.18357" target="_blank" inline>CHI 2025 paper</Link>.
		</p>
	</div>
</div>

<style lang="scss">
	@use '@carbon/type';

	.paper-section-container {
		display: flex;
		padding: 64px 40px;
		gap: 150px;
	}

	.text-container {
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.paper-image-container {
		position: relative;
	}

	.co-created-attribution-image,
	.rectangle {
		width: 532px;
		height: 114px;
	}

	.co-created-attribution-image {
		position: relative;
		z-index: 1;
		border: 3px solid #f0ebe1;
	}

	.rectangle {
		position: absolute;
		top: 4px;
		left: 4px;
		background: #f0ebe1;
	}

	.paper-description-text {
		margin-left: 4px;
		margin-top: 8px;
		@include type.type-style('body-short-02');
	}
</style>
