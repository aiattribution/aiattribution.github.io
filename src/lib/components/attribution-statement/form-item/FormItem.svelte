<script lang="ts">
	import { Checkbox, RadioButton, RadioButtonGroup, TextInput } from 'carbon-components-svelte';
	import { FormItemType, type FormItemI } from '../interfaces';

	export let formItem: FormItemI;
</script>

<div class="form-item-container">
	<div class="form-item-text-container">
		<div class="form-item-number">
			{formItem.id}
		</div>
		<div class="form-item-text">
			{formItem.text}
		</div>
	</div>
	<div class="form-item-options-container">
		{#if formItem.type === FormItemType.textInput}
			<TextInput class="text-input" hideLabel />
		{:else if formItem.type === FormItemType.radioButton}
			<RadioButtonGroup hideLegend={true} orientation="vertical">
				{#each formItem.options as formItemOption}
					<RadioButton labelText={formItemOption} value={formItemOption} />
				{/each}
			</RadioButtonGroup>
		{:else if formItem.type === FormItemType.checkbox}
			{#each formItem.options as formItemOption}
				<Checkbox labelText={formItemOption} value={formItemOption} />
			{/each}
		{/if}
	</div>
</div>

<style lang="scss">
	.form-item-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.form-item-text-container {
		display: flex;
		gap: 12px;
	}

	.form-item-number {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 28px;
		height: 28px;
		background-color: var(--cds-ui-03);
		border-radius: 50%;
		font-family: IBM Plex Sans;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0px;
	}

	.form-item-text {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: IBM Plex Sans;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0px;
	}

	.form-item-options-container {
		margin-left: 40px;
	}

	:global(.text-input) {
		background-color: var(--cds-field-02) !important;
		border: 1px solid #c6c6c6 !important;
		line-height: 18px;
		height: 3rem !important;
	}
</style>
