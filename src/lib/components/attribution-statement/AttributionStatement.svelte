<script lang="ts">
	import { Link } from 'carbon-components-svelte';
	import { FormItem, RecommendedAttribution } from '$lib';
	import { MONDAY_FORM_LINK } from '$lib/common/constants';
	import { AIProportionOptions } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import { ATTRIBUTION_FORM_ITEMS } from './constants';
	import { AttributionType, type FormItemI } from './interfaces';

	let attibutionFormItems: FormItemI[] = ATTRIBUTION_FORM_ITEMS;

	const isItemDisabled = (attibutionFormItem: FormItemI): boolean => {
		return attibutionFormItem.id ===
			utilsService.getAttributionFormItemByType(
				AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
				attibutionFormItems
			).id
			? false
			: utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions[0] === AIProportionOptions.ENTIRELY_HUMAN_CREATED ||
					(attibutionFormItem.id ===
						utilsService.getAttributionFormItemByType(
							AttributionType.AI_CONTRIBUTION,
							attibutionFormItems
						).id &&
						utilsService.getAttributionFormItemByType(
							AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
							attibutionFormItems
						).selectedOptions[0] === AIProportionOptions.ENTIRELY_AI_GENERATED);
	};
</script>

<div class="section-container">
	<h1 class="section-title">Create an attribution statement</h1>
	<p class="section-text">
		<span>
			An <strong>attribution statement</strong> provides transparency on if and how AI was used in a
			specific work.
		</span>
		<br />
		<span>
			Fill out this form to create a customized tag. The tag and its associated explanations can be
			copied into your work.
		</span>
	</p>
	<div class="attribution-form">
		<div class="attribution-form-items">
			{#each attibutionFormItems as attibutionFormItem, index (attibutionFormItem.id)}
				{#key isItemDisabled(attibutionFormItem)}
					<FormItem
						bind:formItem={attibutionFormItem}
						isItemDisabled={isItemDisabled(attibutionFormItem)}
						{attibutionFormItems}
						{index}
					/>
				{/key}
				<hr class="form-item-division" />
			{/each}
		</div>
		<div class="recommended-attribution-container">
			<RecommendedAttribution {attibutionFormItems} />
		</div>
	</div>
	<div class="attribution-form-comment">
		This attribution form is still in beta, and we are continuing to improve it. If you have any
		feedback, suggestions, questions, or comments, please let us know via
		<Link href={MONDAY_FORM_LINK} target="_blank" inline>this form</Link>.
	</div>
</div>

<style lang="scss">
	@import '../../../styles/utils.scss';
	$attribution-form-items-width: 436px;

	.attribution-form {
		display: flex;
		width: calc(100% + 2 * $section-container-margin-left-right);
		margin: 0px calc(-1 * $section-container-margin-left-right);
		background-color: var(--cds-ui-01);
	}

	.attribution-form-items {
		display: flex;
		flex-direction: column;
		min-width: $attribution-form-items-width;
		width: $attribution-form-items-width;
		gap: 24px;
		padding: 20px 32px;
		border-right: 1px solid #8d8d8d;
	}

	.form-item-division {
		display: none;
		background-color: #8d8d8d;
		color: #8d8d8d;
		border: none;
	}

	.recommended-attribution-container {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 1rem;
		padding: 20px 40px;
	}

	.attribution-form-comment {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
		margin-top: 70px;
	}

	@media (max-width: 1055px) {
		.attribution-form {
			flex-direction: column;
			width: 100%;
			margin: 0px;
		}

		.attribution-form-items {
			min-width: 100%;
			width: 100%;
			gap: 16px;
			padding: 16px;
			border-right: unset;
		}

		.form-item-division {
			display: block;
			width: calc(100% + 2 * 16px);
			margin: 0px -16px;
			height: 1px;
		}

		.recommended-attribution-container {
			padding: 16px;
			padding-bottom: 32px;
		}

		.attribution-form-comment {
			margin-top: 0;
		}
	}

	@media (max-width: 480px) {
		.attribution-form {
			width: calc(100% + 2 * 16px);
			margin: 0 -16px;
		}
	}
</style>
