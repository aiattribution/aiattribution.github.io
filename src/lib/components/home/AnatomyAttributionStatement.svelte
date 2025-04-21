<script lang="ts">
	import { ContentSwitcher, Switch } from 'carbon-components-svelte';
	import { AnatomyAbbreviatedStatement, AnatomyFullStatement } from '$lib';

	let selectedContentSwitcherIndex: number = 0;
</script>

<div class="section-container">
	<h1 class="section-title">Anatomy of an attribution statement</h1>
	<p class="section-text">
		The attribution statement comes in two forms: full and abbreviated. Both include optional icons.
	</p>
	<div class="section-content-container">
		<ContentSwitcher
			class="content-switcher-container"
			bind:selectedIndex={selectedContentSwitcherIndex}
			size="xl"
		>
			<Switch text="Full statement" />
			<Switch text="Abbreviated statement" />
		</ContentSwitcher>
		<div class="anatomy-statement-image-container">
			{#if selectedContentSwitcherIndex === 0}
				<AnatomyFullStatement />
			{:else}
				<AnatomyAbbreviatedStatement />
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.section-container {
		margin-top: 32px;
	}

	:global(.content-switcher-container) {
		width: 514px !important;
	}

	.anatomy-statement-image-container {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 62px 0;
		border: 1px solid var(--cds-border-inverse);
		margin-top: -1px;
	}

	@media (max-width: 1055px) {
		.section-container {
			margin-top: unset !important;
		}
	}

	@media (max-width: 564px) {
		.anatomy-statement-image-container {
			padding: 31px 0;
		}
	}

	@media (max-width: 545px) {
		:global(.content-switcher-container) {
			width: 100% !important;
		}
	}
</style>
