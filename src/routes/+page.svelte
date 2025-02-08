<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import { Header } from '$lib';
</script>

<div class="page-container">
	<Header />
	<div class="page-content"></div>
</div>

<style lang="scss">
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
</style>
