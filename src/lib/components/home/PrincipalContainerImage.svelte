<script lang="ts">
	import coCreatedAttributionImage from '$lib/assets/images/home-images/DALL-E Human-AI Attribution Illustration.png?w=400;800;1200&format=webp;avif&as=picture';
</script>

<div class="image-container">
	<picture>
		{#each coCreatedAttributionImage.sources as { type, srcset }}
			<source {type} {srcset} />
		{/each}
		<img
			class="co-created-attribution-image"
			src={coCreatedAttributionImage.img.src}
			alt="Co-created attribution"
			loading="lazy"
			width={coCreatedAttributionImage.img.width}
			height={coCreatedAttributionImage.img.height}
		/>
	</picture>
	<div class="image-attribution-statement">AIA PAI Nc Hin R DALL-E v1.0</div>
</div>

<style lang="scss">
	@use '@carbon/type';

	.image-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 16px 40px;

		picture {
			display: contents;
		}
	}

	.co-created-attribution-image {
		box-shadow: 10px 10px 20px 0px #00000040;
	}

	.image-attribution-statement {
		display: flex;
		width: fit-content;
		padding: 8px 16px;
		margin-top: -17px;
		background-color: #514c46;
		font-family: IBM Plex Sans;
		font-weight: 500;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
		color: #ffffff;
	}

	@media (max-width: 1262px) {
		.co-created-attribution-image {
			width: calc(100vw - 816px);
		}
	}

	@media (max-width: 1055px) {
		.image-container {
			padding: unset !important;
		}

		.co-created-attribution-image {
			width: 75% !important;
			max-width: 447px;
		}
	}

	@media (max-width: 480px) {
		.image-attribution-statement {
			font-size: type.type-scale(1);
			padding: 6px 12px;
		}
	}
</style>
