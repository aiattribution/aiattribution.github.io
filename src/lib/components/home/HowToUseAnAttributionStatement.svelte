<script lang="ts"></script>

<div class="section-container">
	<h1 class="section-title">How to use an attribution statement</h1>
	<p class="section-text">
		Attribution statements can be copied as text, downloaded as an SVG, or copied as HTML. How you
		incorporate it into your work is up to you and likely depends on the content modality, context
		of work, your audience’s needs, and/or your institution’s requirements.
	</p>
	<p class="section-text">
		For digital content, consider linking the attribution statement to this website to help people
		interpret it.
	</p>
	<p class="section-text">Here are two examples to demonstrate possible uses →</p>
	<div class="attribution-statement-examples-container">
		<div class="attribution-statement-example">
			<img
				class="attribution-statement-example-image"
				src="home-images/attribution-statement-example-1.png"
				alt="Attribution Statement Example"
			/>
			<p class="image-caption">
				This image was used in a conference presentation, with the attribution statement placed
				below the image.
			</p>
		</div>
		<div class="attribution-statement-example">
			<img
				class="attribution-statement-example-image"
				src="home-images/attribution-statement-example-2.png"
				alt="Attribution Statement Example"
			/>
			<p class="image-caption">
				This example is from our research paper, where we included an attribution statement in the
				Acknowledgments section.
			</p>
		</div>
	</div>
</div>

<style lang="scss">
	@use '@carbon/type';

	.attribution-statement-examples-container {
		display: flex;
		align-items: baseline;
		gap: 32px;
		width: 100%;
	}

	.attribution-statement-example {
		display: flex;
		flex-direction: column;
		gap: 12px;
		flex: 1;
	}

	.attribution-statement-example-image {
		width: 100%;
		border: 1px solid var(--cds-border-subtle);
	}

	.image-caption {
		@include type.type-style('body-short-02');
	}

	@media (max-width: 1055px) {
		.image-caption {
			font-size: type.type-scale(1);
			line-height: 16px;
		}
	}
</style>
