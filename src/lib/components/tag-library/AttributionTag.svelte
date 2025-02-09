<script lang="ts">
	import type { AttributionTagI } from './interfaces';

	export let attributionTag: AttributionTagI;
</script>

<div class="attribution-tag-container">
	<h2 class="attribution-tag-title">{attributionTag.name}</h2>
</div>

<style lang="scss">
	.attribution-tag-container {
		display: flex;
		flex-direction: column;
	}

	.attribution-tag-title {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0px;
	}
</style>
