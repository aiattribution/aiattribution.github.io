<script lang="ts">
	import { Link } from 'carbon-components-svelte';
	import { FormItems, RecommendedAttributionStatement } from '$lib';
	import { MONDAY_FORM_LINK } from '$lib/common/constants';
	import { ATTRIBUTION_FORM_ITEMS, CREATE_ATTRIBUTION_SECTION_TITLE } from './constants';
	import { type FormItemI } from './interfaces';

	let attibutionFormItems: FormItemI[] = structuredClone(ATTRIBUTION_FORM_ITEMS);
</script>

<div class="section-container">
	<h1 class="section-title">{CREATE_ATTRIBUTION_SECTION_TITLE}</h1>
	<p class="section-text">
		Fill out this form to create an attribution statement that provides transparency on whether and
		how AI was used in your work. The statement and explanations can be copied and incorporated into
		your work.
	</p>
	<div class="attribution-form">
		<FormItems bind:attibutionFormItems />
		<div class="recommended-attribution-container">
			<RecommendedAttributionStatement {attibutionFormItems} />
		</div>
	</div>
	<div class="section-text">
		This tool is still in beta, and we are continuing to improve it. If you have any feedback,
		suggestions, questions, or comments, please let us know via
		<Link href={MONDAY_FORM_LINK} target="_blank" inline>this form</Link>.
	</div>
</div>

<style lang="scss">
	@use '@carbon/type';
	@import '../../../styles/utils.scss';

	.attribution-form {
		display: flex;
		width: calc(100% + 2 * $section-container-margin-left-right);
		margin: 0px calc(-1 * $section-container-margin-left-right);
		background-color: var(--cds-ui-01);
	}

	.recommended-attribution-container {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 1rem;
		padding: 20px 40px;
	}

	@media (max-width: 1055px) {
		.attribution-form {
			flex-direction: column;
			width: 100%;
			margin: 0px;
		}

		.recommended-attribution-container {
			padding: 16px;
			padding-bottom: 32px;
		}
	}

	@media (max-width: 480px) {
		.attribution-form {
			width: calc(100% + 2 * 16px);
			margin: 0 -16px;
		}
	}
</style>
