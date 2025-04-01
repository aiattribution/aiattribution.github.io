<script lang="ts">
	import { FormItem } from '$lib';
	import { AIProportionOptions } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import { AttributionType, type FormItemI } from '../interfaces';

	export let attibutionFormItems: FormItemI[];

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
