<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { apiService, utilsService } from '$lib/services';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';
	import {
		AIA,
		NO_AI_USED_FULL_STATEMENT,
		VERSION
	} from '../create-attribution-statement/constants';

	export let attributionFormItems: FormItemI[];

	let fullStatementHTMLContainer: HTMLDivElement = null;

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
		const statement: string = getFullStatement().split(/\s+/).join(' ');
		apiService.updateCloseActions({
			includeNumberOfActionsOnAbbreviatedStatements: false,
			includeNumberOfActionsOnFullStatements: false,
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
		return;
	};

	const getFullStatement = (): string => {
		let fullStatement: string = '';
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
			fullStatement = `${AIA} ${proportionOfContribution}${aiContribution}${aiInitiatives}${humanReview}${aiUsed} ${VERSION}`;
		} else {
			aiUsed = NO_AI_USED_FULL_STATEMENT;
			fullStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return fullStatement;
	};

	const copyFullStatementToClipboard = async (): Promise<void> => {
		try {
			const statement: string = getFullStatement().split(/\s+/).join(' ');
			await navigator.clipboard.writeText(statement);
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: false,
				includeNumberOfActionsOnFullStatements: true,
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying full statement to clipboard', err);
		}
	};

	const downloadFullStatementSVG = (): void => {
		utilsService.downloadStatementSVG(fullStatementHTMLContainer, 'full_statement');
		const statement: string = getFullStatement().split(/\s+/).join(' ');
		apiService.updateDownloadActions({
			includeNumberOfActionsOnAbbreviatedStatements: false,
			includeNumberOfActionsOnFullStatements: true,
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">Full statement</div>
	<div class="recommended-attribution-item">
		<div bind:this={fullStatementHTMLContainer} class="recommended-attribution-item-text-container">
			<div class="recommended-attribution-item-text">{getFullStatement()}</div>
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
					await copyFullStatementToClipboard();
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
					downloadFullStatementSVG();
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
</style>
