<script lang="ts">
	import { AIProportionOptions } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import { FormItem } from '..';
	import { AttributionType, type FormItemI } from '../interfaces';

	export let attributionFormItems: FormItemI[];

	const isItemDisabled = (attributionFormItem: FormItemI): boolean => {
		return attributionFormItem.id ===
			utilsService.getAttributionFormItemByType(
				AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
				attributionFormItems
			).id
			? false
			: utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attributionFormItems
				).selectedOptions[0] === AIProportionOptions.ENTIRELY_HUMAN_CREATED ||
					(attributionFormItem.id ===
						utilsService.getAttributionFormItemByType(
							AttributionType.AI_CONTRIBUTION,
							attributionFormItems
						).id &&
						utilsService.getAttributionFormItemByType(
							AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
							attributionFormItems
						).selectedOptions[0] === AIProportionOptions.ENTIRELY_AI_GENERATED);
	};
</script>

<div class="attribution-form-items">
	{#each attributionFormItems as attributionFormItem, index (attributionFormItem.id)}
		{#key isItemDisabled(attributionFormItem)}
			<FormItem
				bind:formItem={attributionFormItem}
				isItemDisabled={isItemDisabled(attributionFormItem)}
				{attributionFormItems}
				{index}
			/>
		{/key}
		<hr class="form-item-division" />
	{/each}
</div>

<style lang="scss">
	$attribution-form-items-width: 436px;

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

	@media (max-width: 1055px) {
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
	}
</style>
