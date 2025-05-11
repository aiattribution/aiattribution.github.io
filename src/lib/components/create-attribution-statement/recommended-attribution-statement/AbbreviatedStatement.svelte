<script lang="ts">
	import { base } from '$app/paths';
	import { utilsService } from '$lib/services';
	import { AIA, LAST_VERSION, NO_AI_USED_ABBREVIATED_STATEMENT } from '../constants';
	import { AttributionType, type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const typeOfStatementName: string = 'abbreviated_statement';
	const baseUrl: string = window.location.origin + base;
	let formattedStatement: string = '';
	let canonicalUrl: string = '';

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;
	let abbreviatedStatementHTMLText: string = '';

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
		await utilsService.copyStatementTextToClipboard(
			abbreviatedStatement,
			canonicalUrl,
			attributionFormItems,
			typeOfStatementName
		);
	};

	const downloadAbbreviatedStatementTextSVG = (): void => {
		utilsService.downloadStatementTextSVG(
			abbreviatedStatement,
			abbreviatedStatementHTMLContainer,
			attributionFormItems,
			typeOfStatementName
		);
	};

	const copyAbbreviatedStatementHTMLToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementHTMLToClipboard(
			abbreviatedStatementHTMLText,
			attributionFormItems,
			typeOfStatementName
		);
	};
</script>

<StatementRenderer
	{attributionFormItems}
	recommendedAttributionItemLabel="Abbreviated statement"
	bind:statementHTMLContainer={abbreviatedStatementHTMLContainer}
	{canonicalUrl}
	statementText={abbreviatedStatement}
	statementHTMLText={abbreviatedStatementHTMLText}
	updateStatement={updateAbbreviatedStatement}
	updateStatementHTMLText={updateAbbreviatedStatementHTMLText}
	on:copyStatementTextToClipboard={async () => {
		await copyAbbreviatedStatementTextToClipboard();
	}}
	on:downloadStatementTextSVG={downloadAbbreviatedStatementTextSVG}
	on:copyStatementHTMLToClipboard={async () => {
		await copyAbbreviatedStatementHTMLToClipboard();
	}}
/>

<style lang="scss">
</style>
