<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { base } from '$app/paths';
	import { analyticsService, utilsService } from '$lib/services';
	import { AIA, LAST_VERSION, NO_AI_USED_FULL_STATEMENT } from '../constants';
	import { AttributionType, type FormItemI } from '../interfaces';
	import StatementRenderer from './StatementRenderer.svelte';

	export let attributionFormItems: FormItemI[];
	export let abbreviatedStatement: string;

	const baseUrl: string = window.location.origin + base;
	let formattedStatement: string = '';
	let canonicalUrl: string = '';
	$: if (abbreviatedStatement) {
		formattedStatement = abbreviatedStatement.trim().replace(/\s+/g, '-');
		canonicalUrl = `${baseUrl}/statements/${formattedStatement}`;
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
			fullStatement = `${AIA} ${proportionOfContribution}${aiContribution}${aiInitiatives}${humanReview}${aiUsed} ${LAST_VERSION}`;
		} else {
			aiUsed = NO_AI_USED_FULL_STATEMENT;
			fullStatement = `${AIA} ${aiUsed} ${LAST_VERSION}`;
		}
	};

	const updateFullStatementHTMLText = (): void => {
		fullStatementHTMLText = utilsService.getStatementHTMLText(fullStatementHTMLContainer);
	};

	const copyFullStatementTextToClipboard = async (): Promise<void> => {
		try {
			const statement: string = fullStatement.split(/\s+/).join(' ');
			const statementWithURL: string = `<a href="${canonicalUrl}">${statement}</a>`;
			await navigator.clipboard.write([
				new ClipboardItem({
					'text/plain': new Blob([statement], { type: 'text/plain' }),
					'text/html': new Blob([statementWithURL], { type: 'text/html' })
				})
			]);
			analyticsService.trackStatementMetric('button_click_copy_full_statement_text', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying full statement text to clipboard', err);
		}
	};

	const downloadFullStatementTextSVG = (): void => {
		utilsService.downloadStatementSVG(fullStatementHTMLContainer, 'full_statement');
		const statement: string = fullStatement.split(/\s+/).join(' ');
		analyticsService.trackStatementMetric('button_click_download_full_statement_text', {
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
		});
	};

	const copyFullStatementHTMLToClipboard = async (): Promise<void> => {
		try {
			const statement: string = fullStatementHTMLText;
			await navigator.clipboard.writeText(statement);
			analyticsService.trackStatementMetric('button_click_copy_full_statement_html', {
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attributionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attributionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attributionFormItems)
			});
		} catch (err) {
			console.error('Error copying full statement HTML to clipboard', err);
		}
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
