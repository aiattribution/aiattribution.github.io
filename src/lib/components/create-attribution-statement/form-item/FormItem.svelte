<script lang="ts">
	import { onMount } from 'svelte';
	import { ChevronDown, ChevronUp, Help } from 'carbon-icons-svelte';
	import {
		Button,
		Checkbox,
		RadioButton,
		RadioButtonGroup,
		TextInput,
		TooltipIcon
	} from 'carbon-components-svelte';
	import { utilsService } from '$lib/services';
	import { FormItemType, type FormItemI, type StatementOption } from '../interfaces';

	export let formItem: FormItemI;
	export let isItemDisabled: boolean;
	export let attributionFormItems: FormItemI[];
	export let index: number;

	let isMobileOrTablet: boolean = false;

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
		isMobileOrTablet = window.matchMedia('(max-width: 1055px)').matches;
	};

	const openNextFormItem = (increment: number): void => {
		const indexToEvaluate: number = index + increment;
		if (indexToEvaluate < attributionFormItems.length) {
			if (!attributionFormItems[indexToEvaluate].isItemDisabled) {
				attributionFormItems[indexToEvaluate].isItemOpen = true;
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

		formItem.selectedOptions = formItem.options
			.filter((statementOption: StatementOption) =>
				formItem.selectedOptions.includes(statementOption.option)
			)
			.map((statementOption: StatementOption) => statementOption.option);
	};
</script>

<div class="form-item-container" class:disabled={isItemDisabled}>
	<div class="form-item-text-container" class:disabled={isItemDisabled}>
		<div class="form-item-number">
			{formItem.id}
		</div>
		<div class="form-item-text-and-tooltip-container">
			<div class="form-item-text">
				{formItem.text}
			</div>
			<div class="form-item-tooltip">
				{#if formItem.tooltipDescription && formItem.tooltipDescription.trim()}
					<TooltipIcon
						class="tooltip"
						tooltipText={formItem.tooltipDescription}
						icon={Help}
						direction={isMobileOrTablet ? 'top' : 'right'}
					/>
				{/if}
			</div>
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
			{#if isMobileOrTablet}
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
	{#if !isMobileOrTablet || formItem.isItemOpen}
		<div class="form-item-options-container">
			{#if formItem.typeOfItem === FormItemType.textInput}
				<TextInput
					class="form-iten-text-input"
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
						<RadioButton labelText={formItemOption.option} value={formItemOption.option} />
					{/each}
				</RadioButtonGroup>
			{:else if formItem.typeOfItem === FormItemType.checkbox}
				<div class="checkboxes-container">
					{#each formItem.options as formItemOption}
						<div class="checkbox-container">
							<Checkbox
								labelText={formItemOption.option}
								value={formItemOption}
								checked={formItem.selectedOptions.includes(formItemOption.option)}
								disabled={isItemDisabled}
								on:check={(event) => {
									onCheckFormItem(event, formItemOption.option);
								}}
							/>
							{#if formItemOption.tooltipDescription && formItemOption.tooltipDescription.trim()}
								<TooltipIcon
									class="tooltip"
									tooltipText={formItemOption.tooltipDescription}
									icon={Help}
									direction={isMobileOrTablet ? 'top' : 'right'}
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
			{#if isMobileOrTablet}
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
	@use '@carbon/type';

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
		@include type.type-style('heading-02');
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
		background-color: white;
		border-radius: 50%;
		border: 1px solid #161616;
	}

	.form-item-text-and-tooltip-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
	}

	.form-item-text,
	.form-item-tooltip {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clear-button-container {
		display: flex;
		align-items: center;
		margin-left: auto;
		margin-right: -1rem;
		height: 28px;

		:global(.bx--btn) {
			min-height: 28px !important;
		}
	}

	.form-item-options-container {
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-left: 40px;
	}

	:global(.form-iten-text-input) {
		background-color: var(--cds-field-02) !important;
		border: 1px solid #c6c6c6 !important;
		line-height: 18px;
		height: 3rem !important;
	}

	.checkboxes-container {
		display: flex;
		flex-direction: column;
	}

	.checkbox-container {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	:global(.checkbox-container .bx--checkbox-wrapper) {
		flex: unset !important;
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
			@include type.type-style('body-short-01');
		}

		.clear-button-container {
			margin-right: 0rem !important;
		}
	}
</style>
