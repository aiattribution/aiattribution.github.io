<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy } from 'carbon-icons-svelte';
	import { analyticsService, utilsService } from '$lib/services';
	import type { FormItemI } from '../interfaces';

	export let attributionFormItems: FormItemI[];

	const copyExpandedStatementTextToClipboard = async (): Promise<void> => {
		try {
			const statement: string = utilsService
				.getAttributionStatementExplanation(attributionFormItems)
				.split(/\s+/)
				.join(' ');
			await navigator.clipboard.writeText(statement);
			analyticsService.trackStatementMetric('button_click_copy_expanded_statement_text', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying expanded statement text to clipboard', err);
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">Expanded statement</div>
	<div class="recommended-attribution-item">
		<div class="recommended-attribution-item-text-container">
			<div
				class="recommended-attribution-item-text"
				data-cy="recommended-attribution-statement-text"
			>
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
					await copyExpandedStatementTextToClipboard();
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
