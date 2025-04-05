<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { apiService, utilsService } from '$lib/services';
	import {
		AIA,
		NO_AI_USED_ABBREVIATED_STATEMENT,
		VERSION
	} from '../create-attribution-statement/constants';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';

	export let attibutionFormItems: FormItemI[];

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;

	const getAbbreviatedStatement = (): string => {
		let abbreviatedStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		const modelSelected: string = utilsService.getAttributionFormItemByType(
			AttributionType.MODEL,
			attibutionFormItems
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
						attibutionFormItems
					).selectedOptions
				);
			const aiContribution: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			const humanReview: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			abbreviatedStatement = `${AIA} ${proportionOfContribution} ${aiUsed} ${aiContribution} ${aiInitiatives} ${humanReview} ${VERSION}`;
		} else {
			abbreviatedStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return abbreviatedStatement;
	};

	const copyAbbreviatedStatementToClipboard = async (): Promise<void> => {
		try {
			const statement: string = getAbbreviatedStatement().split(/\s+/).join(' ');
			await navigator.clipboard.writeText(statement);
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: true,
				includeNumberOfActionsOnFullStatements: false,
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
			});
		} catch (err) {
			console.error('Error copying abbreviated statement to clipboard', err);
		}
	};

	const downloadAbbreviatedStatementSVG = (): void => {
		utilsService.downloadStatementSVG(abbreviatedStatementHTMLContainer, 'abbreviated_statement');
		const statement: string = getAbbreviatedStatement().split(/\s+/).join(' ');
		apiService.updateDownloadActions({
			includeNumberOfActionsOnAbbreviatedStatements: true,
			includeNumberOfActionsOnFullStatements: false,
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
		});
	};
</script>

<div class="recommended-attribution-item-container">
	<div class="recommended-attribution-item-label">
		<p>Abbreviated statement</p>
	</div>
	<div class="recommended-attribution-item">
		<div
			bind:this={abbreviatedStatementHTMLContainer}
			class="recommended-attribution-item-text-container"
		>
			<div class="recommended-attribution-item-text">{getAbbreviatedStatement()}</div>
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
					await copyAbbreviatedStatementToClipboard();
				}}
			/>
		</div>
		<div class="recommended-attribution-item-button-container">
			<Button
				kind="ghost"
				iconDescription="Download"
				icon={Download}
				on:click={() => {
					downloadAbbreviatedStatementSVG();
				}}
			/>
		</div>
	</div>
</div>

<style lang="scss">
</style>
