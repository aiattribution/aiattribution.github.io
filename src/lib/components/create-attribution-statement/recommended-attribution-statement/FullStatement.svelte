<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { analyticsService, utilsService } from '$lib/services';
	import { type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const typeOfStatementName: string = 'full_statement';
	let canonicalUrl: string = '';
	$: if (abbreviatedStatement) {
		canonicalUrl = utilsService.getCanonicalURL(abbreviatedStatement);
	}

	let fullStatementHTMLContainer: HTMLDivElement = null;
	let fullStatement: string = '';
	let fullStatementHTMLText: string = '';

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

	const updateFullStatement = (): void => {
		fullStatement = utilsService.getStatementText(
			attributionFormItems,
			utilsService.getConcatenatedOptionsFullStatement,
			', '
		);
	};

	const updateFullStatementHTMLText = (): void => {
		fullStatementHTMLText = utilsService.getStatementHTMLText(fullStatementHTMLContainer);
	};

	const copyFullStatementTextToClipboard = async (): Promise<void> => {
		await utilsService.copyStatementTextToClipboard(
			fullStatement,
			canonicalUrl,
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
			fullStatementHTMLText,
			attributionFormItems,
			typeOfStatementName
		);
	};
</script>

<StatementRenderer
	{attributionFormItems}
	recommendedAttributionItemLabel="Full statement"
	bind:statementHTMLContainer={fullStatementHTMLContainer}
	{canonicalUrl}
	statementText={fullStatement}
	statementHTMLText={fullStatementHTMLText}
	updateStatement={updateFullStatement}
	updateStatementHTMLText={updateFullStatementHTMLText}
	on:copyStatementTextToClipboard={async () => {
		await copyFullStatementTextToClipboard();
	}}
	on:downloadStatementTextSVG={downloadFullStatementTextSVG}
	on:copyStatementHTMLToClipboard={async () => {
		await copyFullStatementHTMLToClipboard();
	}}
/>

<style lang="scss">
</style>
