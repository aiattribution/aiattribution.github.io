<script lang="ts">
	import { FormItem, RecommendedAttribution } from '$lib';
	import { ATTRIBUTION_FORM_ITEMS } from './constants';
	import type { FormItemI } from './interfaces';

	let attibutionFormItems: FormItemI[] = ATTRIBUTION_FORM_ITEMS;
</script>

<div class="section-container">
	<h1 class="section-title">Create an attribution statement</h1>
	<p class="section-text">
		<span>
			An <strong>attribution tag</strong> provides transparency on if and how AI was used in a specific
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
				<FormItem bind:formItem={attibutionFormItem} />
			{/each}
		</div>
		<div class="recommended-attribution-container">
			<RecommendedAttribution />
		</div>
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
</style>
