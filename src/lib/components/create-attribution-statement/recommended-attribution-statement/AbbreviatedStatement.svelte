<script lang="ts">
	import { base } from '$app/paths';
	import { analyticsService, utilsService } from '$lib/services';
	import { AIA, LAST_VERSION, NO_AI_USED_ABBREVIATED_STATEMENT } from '../constants';
	import { AttributionType, type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

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
