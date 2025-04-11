<script lang="ts">
	import {
		AbbreviatedStatement,
		AttributionStatementExplanation,
		ExpandedStatement,
		FullStatement
	} from '$lib';
	import { type FormItemI } from '../create-attribution-statement/interfaces';

	export let attibutionFormItems: FormItemI[];

	const hasAnyResponseToAnyFormItem = (): boolean => {
		return attibutionFormItems.some(
			(item: FormItemI) => item.selectedOptions.length > 0 && item.selectedOptions[0]
		);
	};
</script>

<h2 class="recommended-attribution-title">Recommended attribution statement</h2>

{#if hasAnyResponseToAnyFormItem()}
	<AbbreviatedStatement {attibutionFormItems} />
	<FullStatement {attibutionFormItems} />
	<ExpandedStatement {attibutionFormItems} />
	<AttributionStatementExplanation {attibutionFormItems} />
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
