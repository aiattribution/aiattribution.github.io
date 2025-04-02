<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { apiService, utilsService } from '$lib/services';
	import { AttributionType, type FormItemI } from '../attribution-statement/interfaces';
	import { AIA, NO_AI_USED_FULL_STATEMENT, VERSION } from '../attribution-statement/constants';

	export let attibutionFormItems: FormItemI[];

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
			fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
		});
		return;
	};

	const getFullStatement = (): string => {
		let fullStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		const modelSelected: string = utilsService.getAttributionFormItemByType(
			AttributionType.MODEL,
			attibutionFormItems
		).selectedOptions[0];

		if (isAIUsageOptionYes) {
			const proportionOfContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions,
				false
			);
			if (modelSelected) {
				if (proportionOfContribution) {
					aiUsed = `, ${modelSelected}`;
				} else {
					aiUsed = modelSelected;
				}
			} else {
				aiUsed = '';
			}
			const aiContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed ? true : false
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed || aiContribution ? true : false
			);
			const humanReview: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions,
				proportionOfContribution || aiUsed || aiContribution || aiInitiatives ? true : false
			);
			fullStatement = `${AIA} ${proportionOfContribution}${aiUsed}${aiContribution}${aiInitiatives}${humanReview} ${VERSION}`;
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
				fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
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
			fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
		});
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">
		<p>Full statement</p>
	</div>
	<div class="recommended-attribution-item">
		<div bind:this={fullStatementHTMLContainer} class="recommended-attribution-item-text-container">
			<div class="recommended-attribution-item-text">{getFullStatement()}</div>
			<div class="recommended-attribution-item-icons-container">
				{#each utilsService.getAttributionIcons(attibutionFormItems) as AttributionIcon}
					<svelte:component this={AttributionIcon} />
				{/each}
			</div>
		</div>
		<div class="recommended-attribution-item-button-container">
			<Button
				kind="ghost"
				iconDescription="Copy"
				icon={Copy}
				on:click={async () => {
					await copyFullStatementToClipboard();
				}}
			/>
		</div>
		<div class="recommended-attribution-item-button-container">
			<Button
				kind="ghost"
				iconDescription="Download"
				icon={Download}
				on:click={() => {
					downloadFullStatementSVG();
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
</style>
