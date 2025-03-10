<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown, ChevronUp } from 'carbon-icons-svelte';
	import {
		Button,
		Checkbox,
		RadioButton,
		RadioButtonGroup,
		TextInput
	} from 'carbon-components-svelte';
	import { utilsService } from '$lib/services';
	import { FormItemType, type FormItemI } from '../interfaces';

	export let formItem: FormItemI;
	export let isItemDisabled: boolean;
	export let attibutionFormItems: FormItemI[];
	export let index: number;

	let isMobile: boolean = false;

	onMount(() => {
		formItem.isItemDisabled = isItemDisabled;
		if (isItemDisabled) {
			formItem.isItemOpen = false;
			clearSelections();
		}

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	});

	const clearSelections = (): void => {
		if (
			formItem.typeOfItem === FormItemType.textInput ||
			formItem.typeOfItem === FormItemType.radioButton
		) {
			formItem.selectedOptions = [''];
		} else if (formItem.typeOfItem === FormItemType.checkbox) {
			formItem.selectedOptions = [];
		}
	};

	const checkScreenSize = (): void => {
		isMobile = window.matchMedia('(max-width: 1055px)').matches;
	};

	const openNextFormItem = (increment: number): void => {
		const indexToEvaluate: number = index + increment;
		if (indexToEvaluate < attibutionFormItems.length) {
			if (!attibutionFormItems[indexToEvaluate].isItemDisabled) {
				attibutionFormItems[indexToEvaluate].isItemOpen = true;
			} else {
				openNextFormItem(increment + 1);
			}
		}
	};

	const closeFormItem = (): void => {
		formItem.isItemOpen = false;
		openNextFormItem(1);
	};

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
		<div class="clear-button-container">
			<Button
				kind="ghost"
				size="small"
				disabled={isItemDisabled}
				on:click={() => {
					clearSelections();
				}}
			>
				Clear
			</Button>
			{#if isMobile}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="chevron-icon-container"
					on:click={() => {
						if (!isItemDisabled) {
							formItem.isItemOpen = !formItem.isItemOpen;
						}
					}}
				>
					{#if formItem.isItemOpen}
						<ChevronUp />
					{:else}
						<ChevronDown />
					{/if}
				</div>
			{/if}
		</div>
	</div>
	{#if !isMobile || formItem.isItemOpen}
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
				<div class="checkboxes-container">
					{#each formItem.options as formItemOption}
						<Checkbox
							labelText={formItemOption}
							value={formItemOption}
							checked={formItem.selectedOptions.includes(formItemOption)}
							disabled={isItemDisabled}
							on:check={(event) => {
								onCheckFormItem(event, formItemOption);
							}}
						/>
					{/each}
				</div>
			{/if}
			{#if isMobile}
				<Button
					class="next-button"
					kind="secondary"
					size="small"
					on:click={() => {
						closeFormItem();
					}}
				>
					Next
				</Button>
			{/if}
		</div>
	{:else if formItem.selectedOptions.length > 0 && formItem.selectedOptions[0]}
		<div class="selected-option-container">
			{#if formItem.typeOfItem === FormItemType.textInput}
				{formItem.selectedOptions}
			{:else}
				{utilsService.getConcatenatedOptionsFullStatement(formItem.selectedOptions, false)}
			{/if}
		</div>
	{/if}
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
		.form-item-text,
		.chevron-icon-container {
			color: var(--cds-disabled-02) !important;
		}
	}

	.form-item-number {
		display: flex;
		justify-content: center;
		align-items: center;
		min-width: 28px;
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

	.clear-button-container {
		display: flex;
		align-items: center;
		margin-left: auto;
		margin-right: -1rem;
		height: 2rem;
	}

	.form-item-options-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-left: 40px;
	}

	:global(.text-input) {
		background-color: var(--cds-field-02) !important;
		border: 1px solid #c6c6c6 !important;
		line-height: 18px;
		height: 3rem !important;
	}

	.checkboxes-container {
		display: flex;
		flex-direction: column;
	}

	:global(.next-button) {
		width: 110px !important;
	}

	@media (max-width: 1055px) {
		.chevron-icon-container {
			display: block;
			height: 16px;
		}

		.selected-option-container {
			margin-left: 40px;
			font-family: IBM Plex Sans;
			font-weight: 400;
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.16px;
		}

		.clear-button-container {
			margin-right: 0rem !important;
		}
	}
</style>
