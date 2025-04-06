<script lang="ts">
	import { TextInput } from 'carbon-components-svelte';
	import { TagLibrary } from '$lib';
</script>

<div class="section-container">
	<h1 class="section-title">Interpret an attribution statement</h1>
	<div class="statement-interpreter-container">
		<p class="section-text">Enter an attribution statement to learn what it means.</p>
		<TextInput
			class="text-input"
			hideLabel
			placeholder="Type or paste an AI attribution statement"
		/>
	</div>
</div>

<TagLibrary />

<style lang="scss">
	@import '../../../styles/utils.scss';

	.statement-interpreter-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: calc(100% + 2 * $section-container-margin-left-right);
		margin: 0px calc(-1 * $section-container-margin-left-right);
		background-color: var(--cds-ui-01);
		padding: 20px 40px;
	}
</style>
