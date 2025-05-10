<script lang="ts">
	import { tick } from 'svelte';
	import { base } from '$app/paths';
	import { Button, Link, Tab, Tabs } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { analyticsService, utilsService } from '$lib/services';
	import {
		AIA,
		LAST_VERSION,
		NO_AI_USED_ABBREVIATED_STATEMENT
	} from '../create-attribution-statement/constants';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const baseUrl: string = window.location.origin + base;
	let formattedStatement: string = '';
	let canonicalUrl: string = '';

	$: attributionFormItems, updateFields();

	let tabSelected: number = 0;

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;
	let abbreviatedStatementHTMLText: string = '';

	const updateFields = async (): Promise<void> => {
		if (tabSelected === 1) {
			tabSelected = 0;
			await tick();
			updateAbbreviatedStatement();
			await tick();
			updateAbbreviatedStatementHTMLText();
			tabSelected = 1;
		} else {
			updateAbbreviatedStatement();
			await tick();
			updateAbbreviatedStatementHTMLText();
		}
	};

	const updateCanonicalURL = (): void => {
		if (abbreviatedStatement) {
			formattedStatement = abbreviatedStatement.trim().replace(/\s+/g, '-');
			canonicalUrl = `${baseUrl}/statements/${formattedStatement}`;
		}
	};

	const updateAbbreviatedStatement = (): void => {
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attributionFormItems);
		const modelSelected: string = utilsService.getAttributionFormItemByType(
			AttributionType.MODEL,
			attributionFormItems
		).selectedOptions[0];
		if (isAIUsageOptionYes) {
			aiUsed = modelSelected.length > 0 ? modelSelected : '';
		} else {
			aiUsed = NO_AI_USED_ABBREVIATED_STATEMENT;
		}

		if (isAIUsageOptionYes) {
			const proportionOfContribution: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
						attributionFormItems
					).selectedOptions
				);
			const aiContribution: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attributionFormItems
				).selectedOptions
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attributionFormItems
				).selectedOptions
			);
			const humanReview: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.HUMAN_REVIEW,
					attributionFormItems
				).selectedOptions
			);
			abbreviatedStatement = `${AIA} ${proportionOfContribution} ${aiContribution} ${aiInitiatives} ${humanReview} ${aiUsed} ${LAST_VERSION}`;
			updateCanonicalURL();
		} else {
			abbreviatedStatement = `${AIA} ${aiUsed} ${LAST_VERSION}`;
			updateCanonicalURL();
		}
	};

	const updateAbbreviatedStatementHTMLText = (): void => {
		abbreviatedStatementHTMLText = utilsService.getStatementHTMLText(
			abbreviatedStatementHTMLContainer
		);
	};

	const copyAbbreviatedStatementTextToClipboard = async (): Promise<void> => {
		try {
			const statement: string = abbreviatedStatement.split(/\s+/).join(' ');
			const statementWithURL: string = `<a href="${canonicalUrl}">${statement}</a>`;
			await navigator.clipboard.write([
				new ClipboardItem({
					'text/plain': new Blob([statement], { type: 'text/plain' }),
					'text/html': new Blob([statementWithURL], { type: 'text/html' })
				})
			]);
			analyticsService.trackStatementMetric('button_click_copy_abbreviated_statement_text', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying abbreviated statement text to clipboard', err);
		}
	};

	const downloadAbbreviatedStatementTextSVG = (): void => {
		utilsService.downloadStatementSVG(abbreviatedStatementHTMLContainer, 'abbreviated_statement');
		const statement: string = abbreviatedStatement.split(/\s+/).join(' ');
		analyticsService.trackStatementMetric('button_click_download_abbreviated_statement_text', {
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
	};

	const copyAbbreviatedStatementHTMLToClipboard = async (): Promise<void> => {
		try {
			const statement: string = abbreviatedStatementHTMLText;
			await navigator.clipboard.writeText(statement);
			analyticsService.trackStatementMetric('button_click_copy_abbreviated_statement_html', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying abbreviated statement HTML to clipboard', err);
		}
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">Abbreviated statement</div>
	<Tabs bind:selected={tabSelected} autoWidth>
		<Tab class="attribution-statement-tab" label="Text" />
		<Tab class="attribution-statement-tab" label="HTML" />
		<svelte:fragment slot="content">
			<div class="recommended-attribution-item">
				{#if tabSelected === 0}
					<div
						bind:this={abbreviatedStatementHTMLContainer}
						class="recommended-attribution-item-text-container"
					>
						<div class="recommended-attribution-item-text">
							<Link
								class="recommended-attribution-item-text"
								href={canonicalUrl}
								target="_blank"
								inline
							>
								{abbreviatedStatement}
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
								await copyAbbreviatedStatementTextToClipboard();
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
								downloadAbbreviatedStatementTextSVG();
							}}
						/>
					</div>
				{:else}
					<div class="recommended-attribution-item-html-container">
						<div class="recommended-attribution-item-text">
							{abbreviatedStatementHTMLText}
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
								await copyAbbreviatedStatementHTMLToClipboard();
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
