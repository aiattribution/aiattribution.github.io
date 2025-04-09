<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy } from 'carbon-icons-svelte';
	import { utilsService } from '$lib/services';
	import type { FormItemI } from '../create-attribution-statement/interfaces';

	export let attibutionFormItems: FormItemI[];

	const copyExpandedStatementToClipboard = async (): Promise<void> => {
		try {
			const statement: string = utilsService
				.getAttributionStatementExplanation(attibutionFormItems)
				.split(/\s+/)
				.join(' ');
			await navigator.clipboard.writeText(statement);
		} catch (err) {
			console.error('Error copying expanded statement to clipboard', err);
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">
		<p>Expanded statement</p>
	</div>
	<div class="recommended-attribution-item">
		<div class="recommended-attribution-item-text-container">
			<div class="recommended-attribution-item-text">
				{utilsService.getAttributionStatementExplanation(attibutionFormItems)}
			</div>
		</div>
		<div class="recommended-attribution-item-button-container">
			<Button
				kind="ghost"
				iconDescription="Copy"
				icon={Copy}
				on:click={async () => {
					await copyExpandedStatementToClipboard();
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.recommended-attribution-item-text {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
	}
</style>
