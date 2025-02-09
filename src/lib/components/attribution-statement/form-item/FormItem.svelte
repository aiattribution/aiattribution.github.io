<script lang="ts">
	import { Checkbox, RadioButton, RadioButtonGroup, TextInput } from 'carbon-components-svelte';
	import { FormItemType, type FormItemI } from '../interfaces';

	export let formItem: FormItemI;
	export let isItemDisabled: boolean;

	const onCheckFormItem = (event: CustomEvent<boolean>, formItemOption: string): void => {
		if (event.detail) {
			if (!formItem.selectedOptions.includes(formItemOption)) {
				formItem.selectedOptions.push(formItemOption);
			}
		} else {
			formItem.selectedOptions = formItem.selectedOptions.filter(
				(option: string) => option !== formItemOption
			);
		}

		formItem.selectedOptions = formItem.options.filter((option: string) =>
			formItem.selectedOptions.includes(option)
		);
	};
</script>

<div class="form-item-container" class:disabled={isItemDisabled}>
	<div class="form-item-text-container" class:disabled={isItemDisabled}>
		<div class="form-item-number">
			{formItem.id}
		</div>
		<div class="form-item-text">
			{formItem.text}
		</div>
	</div>
	<div class="form-item-options-container">
		{#if formItem.typeOfItem === FormItemType.textInput}
			<TextInput
				class="text-input"
				hideLabel
				bind:value={formItem.selectedOptions[0]}
				disabled={isItemDisabled}
			/>
		{:else if formItem.typeOfItem === FormItemType.radioButton}
			<RadioButtonGroup
				hideLegend={true}
				orientation="vertical"
				disabled={isItemDisabled}
				bind:selected={formItem.selectedOptions[0]}
			>
				{#each formItem.options as formItemOption}
					<RadioButton labelText={formItemOption} value={formItemOption} />
				{/each}
			</RadioButtonGroup>
		{:else if formItem.typeOfItem === FormItemType.checkbox}
			{#each formItem.options as formItemOption}
				<Checkbox
					labelText={formItemOption}
					value={formItemOption}
					disabled={isItemDisabled}
					on:check={(event) => {
						onCheckFormItem(event, formItemOption);
					}}
				/>
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

	.form-item-container.disabled {
		cursor: not-allowed;
	}

	.form-item-text-container {
		display: flex;
		gap: 12px;
	}

	.form-item-text-container.disabled {
		.form-item-number,
		.form-item-text {
			color: var(--cds-disabled-02) !important;
		}
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
