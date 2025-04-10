<script lang="ts"></script>

<div class="image-container">
	<img
		class="co-created-attribution-image"
		src="home-images/DALL-E Human-AI Attribution Illustration.png"
		alt="Co-created attribution"
	/>
	<div class="image-attribution-statement">AIA PAI DALL-E Nc Hin R 1.0</div>
</div>

<style lang="scss">
	.image-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 16px 40px;
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

	@media (max-width: 1055px) {
		.image-container {
			padding: unset !important;
		}

		.co-created-attribution-image {
			width: 50% !important;
			max-width: 375px;
		}

		.image-attribution-statement {
			font-size: 12px;
			padding: 6px 12px;
		}
	}
</style>
