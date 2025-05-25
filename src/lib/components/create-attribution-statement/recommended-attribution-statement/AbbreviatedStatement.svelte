<script lang="ts">
	import { utilsService } from '$lib/services';
	import { type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;
	export let canonicalURL: string;

	const typeOfStatementName: string = 'abbreviated_statement';

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;
	let abbreviatedStatementHTMLText: string = '';
	let abbreviatedStatementLatexText: string = '';

	const updateAbbreviatedStatementHTMLText = (): void => {
		abbreviatedStatementHTMLText = utilsService.getStatementHTMLText(
			abbreviatedStatementHTMLContainer
		);
	};

	const updateAbbreviatedStatementLatexText = (): void => {
		abbreviatedStatementLatexText = utilsService.getStatementLatexText(
			abbreviatedStatement,
			canonicalURL,
			abbreviatedStatementHTMLContainer,
			attributionFormItems
		);
	};

	const copyAbbreviatedStatementTextToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementTextToClipboard(
			abbreviatedStatement,
			canonicalURL,
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
			abbreviatedStatement,
			abbreviatedStatementHTMLText,
			attributionFormItems,
			typeOfStatementName
		);
	};

	const copyAbbreviatedStatementLatexToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementLatexToClipboard(
			abbreviatedStatement,
			abbreviatedStatementLatexText,
			attributionFormItems,
			typeOfStatementName
		);
	};
</script>

<StatementRenderer
	{attributionFormItems}
	recommendedAttributionItemLabel="Abbreviated statement"
	statementText={abbreviatedStatement}
	bind:statementHTMLContainer={abbreviatedStatementHTMLContainer}
	statementHTMLText={abbreviatedStatementHTMLText}
	statementLatexText={abbreviatedStatementLatexText}
	{canonicalURL}
	updateStatementHTMLText={updateAbbreviatedStatementHTMLText}
	updateStatementLatexText={updateAbbreviatedStatementLatexText}
	on:copyStatementTextToClipboard={async () => {
		await copyAbbreviatedStatementTextToClipboard();
	}}
	on:downloadStatementTextSVG={downloadAbbreviatedStatementTextSVG}
	on:copyStatementHTMLToClipboard={async () => {
		await copyAbbreviatedStatementHTMLToClipboard();
	}}
	on:copyStatementLatexToClipboard={async () => {
		await copyAbbreviatedStatementLatexToClipboard();
	}}
/>

<style lang="scss">
</style>
