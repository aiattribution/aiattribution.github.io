<script lang="ts">
	import { ATTRIBUTION_FORM_ITEMS_LOCAL_STORAGE_KEY } from '$lib/common/constants';
	import { utilsService } from '$lib/services';
	import {
		AbbreviatedStatement,
		AttributionStatementExplanation,
		ExpandedStatement,
		FullStatement
	} from '..';
	import { type FormItemI } from '../interfaces';

	export let attributionFormItems: FormItemI[];

	$: attributionFormItems, onAttributionFormItemsUpdate();

	let saveInLocalStorage: boolean = false;
	let abbreviatedStatement: string = '';
	let fullStatement: string = '';
	let canonicalURL: string = '';

	const onAttributionFormItemsUpdate = (): void => {
		saveFormStateToLocalStorage();
		updateAbbreviatedStatement();
		updateFullStatement();
		updateCanonicalURL();
	};

	const saveFormStateToLocalStorage = (): void => {
		if (saveInLocalStorage) {
			localStorage.setItem(
				ATTRIBUTION_FORM_ITEMS_LOCAL_STORAGE_KEY,
				JSON.stringify(attributionFormItems)
			);
		} else {
			saveInLocalStorage = true;
		}
	};

	const updateAbbreviatedStatement = (): void => {
		abbreviatedStatement = utilsService.getStatementText(
			attributionFormItems,
			utilsService.getConcatenatedOptionsAbbreviatedStatement,
			' '
		);
	};

	const updateFullStatement = (): void => {
		fullStatement = utilsService.getStatementText(
			attributionFormItems,
			utilsService.getConcatenatedOptionsFullStatement,
			', '
		);
	};

	const updateCanonicalURL = (): void => {
		if (abbreviatedStatement) {
			canonicalURL = utilsService.getCanonicalURL(abbreviatedStatement, attributionFormItems);
		}
	};

	const hasAnyResponseToAnyFormItem = (): boolean => {
		return attributionFormItems.some(
			(item: FormItemI) =>
				item.selectedOptions.length > 0 &&
				item.selectedOptions[0] &&
				item.selectedOptions[0].trim() !== ''
		);
	};
</script>

<h2 class="recommended-attribution-title">Recommended attribution statement</h2>

{#if hasAnyResponseToAnyFormItem()}
	<AbbreviatedStatement {attributionFormItems} {abbreviatedStatement} {canonicalURL} />
	<FullStatement {attributionFormItems} {fullStatement} {canonicalURL} />
	<ExpandedStatement {attributionFormItems} />
	<AttributionStatementExplanation {attributionFormItems} />
{:else}
	<p class="empty-state-text">Fill out the form to get started.</p>
{/if}

<style lang="scss">
	@use '@carbon/type';

	.recommended-attribution-title {
		@include type.type-style('heading-02');
	}

	:global(.recommended-attribution-item-container) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	:global(.recommended-attribution-item-label) {
		@include type.type-style('body-short-01');
		color: #525252;
	}

	:global(.recommended-attribution-item) {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: var(--cds-ui-02);
	}

	:global(.recommended-attribution-item-text-container) {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		flex-grow: 1;
		gap: 0.5rem;
		margin-left: 10.5px;
		padding: 8px 0;
	}

	:global(.recommended-attribution-item-text) {
		@include type.type-style('body-short-02');
	}

	:global(.recommended-attribution-item-button-container) {
		display: flex;
		align-items: flex-start;
		height: 100%;
	}

	.empty-state-text {
		@include type.type-style('body-short-01');
	}
</style>
