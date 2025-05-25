<script lang="ts">
	import { createEventDispatcher, tick, type EventDispatcher } from 'svelte';
	import { Button, Link, Tab, Tabs } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { utilsService } from '$lib/services';
	import type { FormItemI } from '../interfaces';
	import { STATEMENT_TAB_NAMES, StatementTabName } from './constants';

	export let attributionFormItems: FormItemI[];
	export let recommendedAttributionItemLabel: string;
	export let statementText: string;
	export let statementHTMLContainer: HTMLDivElement;
	export let statementHTMLText: string;
	export let statementLatexText: string;
	export let canonicalURL: string;
	export let updateStatementHTMLText: () => void;
	export let updateStatementLatexText: () => void;

	let dispatch: EventDispatcher<any> = createEventDispatcher();

	let tabSelectedId: number = 0;

	$: attributionFormItems, updateFields();

	const updateFields = async (): Promise<void> => {
		await tick();
		updateStatementHTMLText();
		updateStatementLatexText();
	};

	const verifyIfStatementTabIsTheOneSelected = (statementTab: string): boolean => {
		return STATEMENT_TAB_NAMES[tabSelectedId] === statementTab;
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">{recommendedAttributionItemLabel}</div>
	<Tabs bind:selected={tabSelectedId} autoWidth>
		{#each STATEMENT_TAB_NAMES as tabName}
			<Tab class="attribution-statement-tab" label={tabName} />
		{/each}
		<svelte:fragment slot="content">
			<div
				class="recommended-attribution-item"
				class:hide-recommended-attribution-item={!verifyIfStatementTabIsTheOneSelected(
					StatementTabName.text
				)}
			>
				<div bind:this={statementHTMLContainer} class="recommended-attribution-item-text-container">
					<div class="recommended-attribution-item-text">
						<Link
							class="recommended-attribution-item-text"
							href={canonicalURL}
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
			</div>
			<div
				class="recommended-attribution-item"
				class:hide-recommended-attribution-item={!verifyIfStatementTabIsTheOneSelected(
					StatementTabName.html
				)}
			>
				<div class="recommended-attribution-item-html-latex-container">
					<div class="recommended-attribution-item-text">
						{statementHTMLText}
					</div>
				</div>
				<div class="recommended-attribution-item-button-container">
					<Button
						kind="ghost"
						icon={Copy}
						iconDescription="Copy the statement as HTML code"
						tooltipAlignment="end"
						tooltipPosition="top"
						on:click={() => {
							dispatch('copyStatementHTMLToClipboard');
						}}
					/>
				</div>
			</div>
			<div
				class="recommended-attribution-item"
				class:hide-recommended-attribution-item={!verifyIfStatementTabIsTheOneSelected(
					StatementTabName.latex
				)}
			>
				<div class="recommended-attribution-item-html-latex-container">
					<div class="recommended-attribution-item-text">
						{statementLatexText}
					</div>
				</div>
				<div class="recommended-attribution-item-button-container">
					<Button
						kind="ghost"
						icon={Copy}
						iconDescription="Copy the statement as LaTeX code"
						tooltipAlignment="end"
						tooltipPosition="top"
						on:click={() => {
							dispatch('copyStatementLatexToClipboard');
						}}
					/>
				</div>
			</div>
		</svelte:fragment>
	</Tabs>
</div>

<style lang="scss">
	@use '@carbon/type';

	.recommended-attribution-item {
		margin-top: -0.5rem;
	}

	.hide-recommended-attribution-item {
		display: none;
	}

	:global(.attribution-statement-tab.bx--tabs__nav-item--selected) {
		background-color: white;
	}

	:global(.recommended-attribution-item-icons-container) {
		display: flex;
		gap: 0.5rem;
	}

	:global(.recommended-attribution-item-html-latex-container) {
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

	:global(.recommended-attribution-item-html-latex-container .recommended-attribution-item-text) {
		@include type.type-style('body-short-01');
		white-space: pre-wrap;
	}
</style>
