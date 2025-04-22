<script lang="ts">
	import {
		AbbreviatedStatement,
		AttributionStatementExplanation,
		ExpandedStatement,
		FullStatement
	} from '$lib';
	import { type FormItemI } from '../create-attribution-statement/interfaces';

	export let attributionFormItems: FormItemI[];

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
	<AbbreviatedStatement {attributionFormItems} />
	<FullStatement {attributionFormItems} />
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

	:global(.attribution-statement-tab.bx--tabs__nav-item--selected) {
		background-color: white;
	}

	:global(.recommended-attribution-item) {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: var(--cds-ui-02);
	}

	:global(.recommended-attribution-item-html-container) {
		display: flex;
		margin: 1rem;
		padding: 0.5rem;
		border: 1px solid #8d8d8d;
		max-height: 4.25rem;
		overflow-y: auto;
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

	:global(.recommended-attribution-item-html-container .recommended-attribution-item-text) {
		@include type.type-style('body-short-01');
	}

	:global(.recommended-attribution-item-text) {
		@include type.type-style('body-short-02');
	}

	:global(.recommended-attribution-item-icons-container) {
		display: flex;
		gap: 0.5rem;
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
