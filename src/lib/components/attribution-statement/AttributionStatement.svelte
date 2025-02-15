<script lang="ts">
	import { Link } from 'carbon-components-svelte';
	import { FormItem, RecommendedAttribution } from '$lib';
	import { MONDAY_FORM_LINK } from '$lib/common/constants';
	import { AIUsageOptions } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import { ATTRIBUTION_FORM_ITEMS } from './constants';
	import { AttributionType, type FormItemI } from './interfaces';

	let attibutionFormItems: FormItemI[] = ATTRIBUTION_FORM_ITEMS;
</script>

<div class="section-container">
	<h1 class="section-title">Create an attribution statement</h1>
	<p class="section-text">
		<span>
			An <strong>attribution statement</strong> provides transparency on if and how AI was used in a specific
			work.
		</span>
		<br />
		<span>
			Fill out this form to create a customized tag. The tag and its associated explanations can be
			copied into your work.
		</span>
	</p>
	<div class="attribution-form">
		<div class="attribution-form-items">
			{#each attibutionFormItems as attibutionFormItem (attibutionFormItem.id)}
				<FormItem
					bind:formItem={attibutionFormItem}
					isItemDisabled={attibutionFormItem.id ===
					utilsService.getAttributionFormItemByType(AttributionType.AI_USED, attibutionFormItems).id
						? false
						: utilsService.getAttributionFormItemByType(
								AttributionType.AI_USED,
								attibutionFormItems
							).selectedOptions[0] === AIUsageOptions.NO}
				/>
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
	}
</style>
