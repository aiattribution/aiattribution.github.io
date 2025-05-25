<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { analyticsService, utilsService } from '$lib/services';
	import { type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let fullStatement: string;
	export let canonicalURL: string;

	const typeOfStatementName: string = 'full_statement';

	let fullStatementHTMLContainer: HTMLDivElement = null;
	let fullStatementHTMLText: string = '';
	let fullStatementLatexText: string = '';

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
		const statement: string = fullStatement.split(/\s+/).join(' ');
		analyticsService.trackStatementMetric('site_close', {
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
		return;
	};

	const updateFullStatementHTMLText = (): void => {
		fullStatementHTMLText = utilsService.getStatementHTMLText(fullStatementHTMLContainer);
	};

	const updateFullStatementLatexText = (): void => {
		fullStatementLatexText = utilsService.getStatementLatexText(
			fullStatement,
			canonicalURL,
			fullStatementHTMLContainer,
			attributionFormItems
		);
	};

	const copyFullStatementTextToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementTextToClipboard(
			fullStatement,
			canonicalURL,
			attributionFormItems,
			typeOfStatementName
		);
	};

	const downloadFullStatementTextSVG = (): void => {
		utilsService.downloadStatementTextSVG(
			fullStatement,
			fullStatementHTMLContainer,
			attributionFormItems,
			typeOfStatementName
		);
	};

	const copyFullStatementHTMLToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementHTMLToClipboard(
			fullStatement,
			fullStatementHTMLText,
			attributionFormItems,
			typeOfStatementName
		);
	};

	const copyFullStatementLatexToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementLatexToClipboard(
			fullStatement,
			fullStatementLatexText,
			attributionFormItems,
			typeOfStatementName
		);
	};
</script>

<StatementRenderer
	{attributionFormItems}
	recommendedAttributionItemLabel="Full statement"
	statementText={fullStatement}
	bind:statementHTMLContainer={fullStatementHTMLContainer}
	statementHTMLText={fullStatementHTMLText}
	statementLatexText={fullStatementLatexText}
	{canonicalURL}
	updateStatementHTMLText={updateFullStatementHTMLText}
	updateStatementLatexText={updateFullStatementLatexText}
	on:copyStatementTextToClipboard={async () => {
		await copyFullStatementTextToClipboard();
	}}
	on:downloadStatementTextSVG={downloadFullStatementTextSVG}
	on:copyStatementHTMLToClipboard={async () => {
		await copyFullStatementHTMLToClipboard();
	}}
	on:copyStatementLatexToClipboard={async () => {
		await copyFullStatementLatexToClipboard();
	}}
/>

<style lang="scss">
</style>
