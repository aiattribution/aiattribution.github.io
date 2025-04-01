<script lang="ts">
	import { Link } from 'carbon-components-svelte';
	import { FormItems, RecommendedAttribution } from '$lib';
	import { MONDAY_FORM_LINK } from '$lib/common/constants';
	import { ATTRIBUTION_FORM_ITEMS } from './constants';
	import { type FormItemI } from './interfaces';

	let attibutionFormItems: FormItemI[] = ATTRIBUTION_FORM_ITEMS;
</script>

<div class="section-container">
	<h1 class="section-title">Create an attribution statement</h1>
	<p class="section-text">
		<span>
			Fill out this form to create an attribution statement that provides transparency on if and how
			AI was used in your work. The statement and explanations can be copied and incorporated into
			your work. See below for more guidance on how to use the statement.
		</span>
	</p>
	<div class="attribution-form">
		<FormItems bind:attibutionFormItems />
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
