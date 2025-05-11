<script lang="ts">
	import { createEventDispatcher, tick, type EventDispatcher } from 'svelte';
	import { Button, Link, Tab, Tabs } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { utilsService } from '$lib/services';
	import type { FormItemI } from '../interfaces';

	export let attributionFormItems: FormItemI[];
	export let recommendedAttributionItemLabel: string;
	export let statementHTMLContainer: HTMLDivElement;
	export let canonicalUrl: string;
	export let statementText: string;
	export let statementHTMLText: string;
	export let updateStatement: () => void;
	export let updateStatementHTMLText: () => void;

	let dispatch: EventDispatcher<any> = createEventDispatcher();

	let tabSelected: number = 0;

	$: attributionFormItems, updateFields();

	const updateFields = async (): Promise<void> => {
		if (tabSelected === 1) {
			tabSelected = 0;
			await tick();
			updateStatement();
			await tick();
			updateStatementHTMLText();
			tabSelected = 1;
		} else {
			updateStatement();
			await tick();
			updateStatementHTMLText();
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">{recommendedAttributionItemLabel}</div>
	<Tabs bind:selected={tabSelected} autoWidth>
		<Tab class="attribution-statement-tab" label="Text" />
		<Tab class="attribution-statement-tab" label="HTML" />
		<svelte:fragment slot="content">
			<div class="recommended-attribution-item">
				{#if tabSelected === 0}
					<div
						bind:this={statementHTMLContainer}
						class="recommended-attribution-item-text-container"
					>
						<div class="recommended-attribution-item-text">
							<Link
								class="recommended-attribution-item-text"
								href={canonicalUrl}
								target="_blank"
								inline
							>
								{statementText}
							</Link>
						</div>
						<div class="recommended-attribution-item-icons-container">
							{#each utilsService.getAttributionIcons(attributionFormItems) as AttributionIcon}
								<svelte:component this={AttributionIcon} />
							{/each}
						</div>
					</div>
					<div class="recommended-attribution-item-button-container">
						<Button
							kind="ghost"
							icon={Copy}
							iconDescription="Copy the statement as text"
							tooltipAlignment="end"
							tooltipPosition="top"
							on:click={() => {
								dispatch('copyStatementTextToClipboard');
							}}
						/>
					</div>
					<div class="recommended-attribution-item-button-container">
						<Button
							kind="ghost"
							icon={Download}
							iconDescription="Download the statement and icons as an svg"
							tooltipAlignment="end"
							tooltipPosition="top"
							on:click={() => {
								dispatch('downloadStatementTextSVG');
							}}
						/>
					</div>
				{:else}
					<div class="recommended-attribution-item-html-container">
						<div class="recommended-attribution-item-text">
							{statementHTMLText}
						</div>
					</div>
					<div class="recommended-attribution-item-button-container">
						<Button
							kind="ghost"
							icon={Copy}
							iconDescription="Copy the statement as HTML"
							tooltipAlignment="end"
							tooltipPosition="top"
							on:click={() => {
								dispatch('copyStatementHTMLToClipboard');
							}}
						/>
					</div>
				{/if}
			</div>
		</svelte:fragment>
	</Tabs>
</div>

<style lang="scss">
	@use '@carbon/type';

	.recommended-attribution-item {
		margin-top: -0.5rem;
	}

	:global(.attribution-statement-tab.bx--tabs__nav-item--selected) {
		background-color: white;
	}

	:global(.recommended-attribution-item-icons-container) {
		display: flex;
		gap: 0.5rem;
	}

	:global(.recommended-attribution-item-html-container) {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		flex-grow: 1;
		margin: 1rem;
		padding: 0.5rem;
		border: 1px solid #8d8d8d;
		max-height: 4.25rem;
		overflow-y: auto;
	}

	:global(.recommended-attribution-item-html-container .recommended-attribution-item-text) {
		@include type.type-style('body-short-01');
	}
</style>
