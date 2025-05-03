<script lang="ts">
	import { apiService, utilsService } from '$lib/services';
	import { Button, Link } from 'carbon-components-svelte';
	import { Copy } from 'carbon-icons-svelte';
	import type { FormItemI } from '../create-attribution-statement/interfaces';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const baseUrl: string = window.location.origin;
	let formattedStatement: string = '';
	let fullUrl: string = '';
	$: formattedStatement = abbreviatedStatement.trim().replace(/\s+/g, '-');
	$: fullUrl = `${baseUrl}/statements/${formattedStatement}`;

	const copyCanonicalURLToClipboard = async (): Promise<void> => {
		try {
			await navigator.clipboard.writeText(fullUrl);
			const statement: string = abbreviatedStatement.split(/\s+/).join(' ');
			apiService.updateEventMetric('button_click_copy_canonical_url', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying canonical url to clipboard', err);
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">Canonical URL</div>
	<div class="recommended-attribution-item">
		<div class="recommended-attribution-item-text-container">
			<div class="recommended-attribution-item-text">
				<Link href={fullUrl} target="_blank" inline>
					{fullUrl}
				</Link>
			</div>
		</div>
		<div class="recommended-attribution-item-button-container">
			<Button
				kind="ghost"
				icon={Copy}
				iconDescription="Copy the canonical URL"
				tooltipAlignment="end"
				tooltipPosition="top"
				on:click={async () => {
					await copyCanonicalURLToClipboard();
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
</style>
