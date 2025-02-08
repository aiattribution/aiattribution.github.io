<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { AttributionStatement, Header } from '$lib';
</script>

<div class="page-container">
	<Header />
	<div class="page-content">
		<AttributionStatement />
	</div>
</div>

<style lang="scss">
	@import '../styles/utils.scss';
	$header-height: 3rem;

	.page-container {
		display: flex;
		width: 100%;
		min-height: 100vh;
		margin: 0;
	}

	.page-content {
		display: flex;
		position: relative;
		top: $header-height;
		height: calc(100vh - $header-height);
		width: 100%;
		margin: 0;
	}

	:global(.section-container) {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		padding: 33px $section-container-margin-left-right;
	}

	:global(.section-title) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 28px;
		line-height: 36px;
		letter-spacing: 0px;
	}

	:global(.section-text) {
		font-family: IBM Plex Sans;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}
</style>
