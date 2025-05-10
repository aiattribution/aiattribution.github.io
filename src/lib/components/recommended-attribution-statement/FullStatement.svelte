<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
	import { base } from '$app/paths';
	import { Button, Link, Tab, Tabs } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { analyticsService, utilsService } from '$lib/services';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';
	import {
		AIA,
		LAST_VERSION,
		NO_AI_USED_FULL_STATEMENT
	} from '../create-attribution-statement/constants';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const baseUrl: string = window.location.origin + base;
	let formattedStatement: string = '';
	let canonicalUrl: string = '';
	$: if (abbreviatedStatement) {
		formattedStatement = abbreviatedStatement.trim().replace(/\s+/g, '-');
		canonicalUrl = `${baseUrl}/statements/${formattedStatement}`;
	}

	$: attributionFormItems, updateFields();

	let tabSelected: number = 0;

	let fullStatementHTMLContainer: HTMLDivElement = null;
	let fullStatement: string = '';
	let fullStatementHTMLText: string = '';

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', handleBeforeUnload);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		}
	});

	const handleBeforeUnload = (event) => {
		event.preventDefault();
		const statement: string = fullStatement.split(/\s+/).join(' ');
		analyticsService.trackStatementMetric('site_close', {
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
		return;
	};

	const updateFields = async (): Promise<void> => {
		if (tabSelected === 1) {
			tabSelected = 0;
			await tick();
			updateFullStatement();
			await tick();
			updateFullStatementHTMLText();
			tabSelected = 1;
		} else {
			updateFullStatement();
			await tick();
			updateFullStatementHTMLText();
		}
	};

	const updateFullStatement = (): void => {
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attributionFormItems);
		const modelSelected: string = utilsService.getAttributionFormItemByType(
			AttributionType.MODEL,
			attributionFormItems
		).selectedOptions[0];

		if (isAIUsageOptionYes) {
			const proportionOfContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attributionFormItems
				).selectedOptions,
				false
			);
			const aiContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attributionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed ? true : false
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attributionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed || aiContribution ? true : false
			);
			const humanReview: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.HUMAN_REVIEW,
					attributionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed || aiContribution || aiInitiatives ? true : false
			);
			if (modelSelected) {
				if (proportionOfContribution || aiContribution || aiInitiatives || humanReview) {
					aiUsed = `, ${modelSelected}`;
				} else {
					aiUsed = modelSelected;
				}
			} else {
				aiUsed = '';
			}
			fullStatement = `${AIA} ${proportionOfContribution}${aiContribution}${aiInitiatives}${humanReview}${aiUsed} ${LAST_VERSION}`;
		} else {
			aiUsed = NO_AI_USED_FULL_STATEMENT;
			fullStatement = `${AIA} ${aiUsed} ${LAST_VERSION}`;
		}
	};

	const updateFullStatementHTMLText = (): void => {
		fullStatementHTMLText = utilsService.getStatementHTMLText(fullStatementHTMLContainer);
	};

	const copyFullStatementTextToClipboard = async (): Promise<void> => {
		try {
			const statement: string = fullStatement.split(/\s+/).join(' ');
			const statementWithURL: string = `<a href="${canonicalUrl}">${statement}</a>`;
			await navigator.clipboard.write([
				new ClipboardItem({
					'text/plain': new Blob([statement], { type: 'text/plain' }),
					'text/html': new Blob([statementWithURL], { type: 'text/html' })
				})
			]);
			analyticsService.trackStatementMetric('button_click_copy_full_statement_text', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying full statement text to clipboard', err);
		}
	};

	const downloadFullStatementTextSVG = (): void => {
		utilsService.downloadStatementSVG(fullStatementHTMLContainer, 'full_statement');
		const statement: string = fullStatement.split(/\s+/).join(' ');
		analyticsService.trackStatementMetric('button_click_download_full_statement_text', {
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
	};

	const copyFullStatementHTMLToClipboard = async (): Promise<void> => {
		try {
			const statement: string = fullStatementHTMLText;
			await navigator.clipboard.writeText(statement);
			analyticsService.trackStatementMetric('button_click_copy_full_statement_html', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying full statement HTML to clipboard', err);
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">Full statement</div>
	<Tabs bind:selected={tabSelected} autoWidth>
		<Tab class="attribution-statement-tab" label="Text" />
		<Tab class="attribution-statement-tab" label="HTML" />
		<svelte:fragment slot="content">
			<div class="recommended-attribution-item">
				{#if tabSelected === 0}
					<div
						bind:this={fullStatementHTMLContainer}
						class="recommended-attribution-item-text-container"
					>
						<div class="recommended-attribution-item-text">
							<Link
								class="recommended-attribution-item-text"
								href={canonicalUrl}
								target="_blank"
								inline
							>
								{fullStatement}
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
							on:click={async () => {
								await copyFullStatementTextToClipboard();
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
								downloadFullStatementTextSVG();
							}}
						/>
					</div>
				{:else}
					<div class="recommended-attribution-item-html-container">
						<div class="recommended-attribution-item-text">
							{fullStatementHTMLText}
						</div>
					</div>
					<div class="recommended-attribution-item-button-container">
						<Button
							kind="ghost"
							icon={Copy}
							iconDescription="Copy the statement as HTML"
							tooltipAlignment="end"
							tooltipPosition="top"
							on:click={async () => {
								await copyFullStatementHTMLToClipboard();
							}}
						/>
					</div>
				{/if}
			</div>
		</svelte:fragment>
	</Tabs>
</div>

<style lang="scss">
	.recommended-attribution-item {
		margin-top: -0.5rem;
	}
</style>
