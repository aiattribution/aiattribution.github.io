<script lang="ts">
	import { tick } from 'svelte';
	import { Button, Tab, Tabs } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { apiService, utilsService } from '$lib/services';
	import {
		AIA,
		NO_AI_USED_ABBREVIATED_STATEMENT,
		VERSION
	} from '../create-attribution-statement/constants';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';

	export let attributionFormItems: FormItemI[];

	$: attributionFormItems, updateFields();

	let tabSelected: number = 0;

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;
	let abbreviatedStatement: string = '';
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
			abbreviatedStatement = `${AIA} ${proportionOfContribution} ${aiContribution} ${aiInitiatives} ${humanReview} ${aiUsed} ${VERSION}`;
		} else {
			abbreviatedStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
	};

	const updateAbbreviatedStatementHTMLText = (): void => {
		abbreviatedStatementHTMLText = utilsService.getStatementHTMLText(
			abbreviatedStatementHTMLContainer
		);
	};

	const copyAbbreviatedStatementToClipboard = async (): Promise<void> => {
		try {
			const statement: string = abbreviatedStatement.split(/\s+/).join(' ');
			await navigator.clipboard.writeText(statement);
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: true,
				includeNumberOfActionsOnFullStatements: false,
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying abbreviated statement to clipboard', err);
		}
	};

	const downloadAbbreviatedStatementSVG = (): void => {
		utilsService.downloadStatementSVG(abbreviatedStatementHTMLContainer, 'abbreviated_statement');
		const statement: string = abbreviatedStatement.split(/\s+/).join(' ');
		apiService.updateDownloadActions({
			includeNumberOfActionsOnAbbreviatedStatements: true,
			includeNumberOfActionsOnFullStatements: false,
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
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: true,
				includeNumberOfActionsOnFullStatements: false,
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
						<div class="recommended-attribution-item-text">{abbreviatedStatement}</div>
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
								await copyAbbreviatedStatementToClipboard();
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
								downloadAbbreviatedStatementSVG();
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
