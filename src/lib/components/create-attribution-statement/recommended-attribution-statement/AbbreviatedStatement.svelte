<script lang="ts">
	import { utilsService } from '$lib/services';
	import { type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const typeOfStatementName: string = 'abbreviated_statement';
	let canonicalUrl: string = '';

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;
	let abbreviatedStatementHTMLText: string = '';

	const updateCanonicalURL = (): void => {
		if (abbreviatedStatement) {
			canonicalUrl = utilsService.getCanonicalURL(abbreviatedStatement);
		}
	};

	const updateAbbreviatedStatement = (): void => {
		abbreviatedStatement = utilsService.getStatementText(
			attributionFormItems,
			utilsService.getConcatenatedOptionsAbbreviatedStatement,
			' '
		);
		updateCanonicalURL();
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
