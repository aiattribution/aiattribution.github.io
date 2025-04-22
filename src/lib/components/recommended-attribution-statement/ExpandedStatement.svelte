<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy } from 'carbon-icons-svelte';
	import { utilsService } from '$lib/services';
	import type { FormItemI } from '../create-attribution-statement/interfaces';

	export let attributionFormItems: FormItemI[];

	const copyExpandedStatementToClipboard = async (): Promise<void> => {
		try {
			const statement: string = utilsService
				.getAttributionStatementExplanation(attributionFormItems)
				.split(/\s+/)
				.join(' ');
			await navigator.clipboard.writeText(statement);
		} catch (err) {
			console.error('Error copying expanded statement to clipboard', err);
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">Expanded statement</div>
	<div class="recommended-attribution-item">
		<div class="recommended-attribution-item-text-container">
			<div class="recommended-attribution-item-text">
				{utilsService.getAttributionStatementExplanation(attributionFormItems)}
			</div>
		</div>
		<div class="recommended-attribution-item-button-container">
			<Button
				kind="ghost"
				icon={Copy}
				iconDescription="Copy the expanded statement as text"
				tooltipAlignment="end"
				tooltipPosition="top"
				on:click={async () => {
					await copyExpandedStatementToClipboard();
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	@use '@carbon/type';

	.recommended-attribution-item-text {
		@include type.type-style('body-short-01');
	}
</style>
