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

	const updateAbbreviatedStatementHTMLText = (): void => {
		abbreviatedStatementHTMLText = utilsService.getStatementHTMLText(
			abbreviatedStatementHTMLContainer
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
			abbreviatedStatementHTMLText,
			attributionFormItems,
			typeOfStatementName
		);
	};
</script>

<StatementRenderer
	{attributionFormItems}
	recommendedAttributionItemLabel="Abbreviated statement"
	statementText={abbreviatedStatement}
	statementHTMLText={abbreviatedStatementHTMLText}
	bind:statementHTMLContainer={abbreviatedStatementHTMLContainer}
	{canonicalURL}
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
