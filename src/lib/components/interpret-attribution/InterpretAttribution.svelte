<script lang="ts">
	import { Button, TextInput } from 'carbon-components-svelte';
	import { ArrowRight } from 'carbon-icons-svelte';
	import { TagLibrary } from '$lib';
	import { PROPORTIONS_OF_CONTRIBUTIONS_TAGS } from '$lib/common/constants';
	import type { TagI } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import { AIA, ATTRIBUTION_FORM_ITEMS } from '../create-attribution-statement/constants';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';

	let attibutionFormItems: FormItemI[] = structuredClone(ATTRIBUTION_FORM_ITEMS);

	let statementToInterpret: string = '';
	let statementExplained: string = '';
	let statementHasAnError: boolean = false;
	let statementError: string = '';

	const resetState = (): void => {
		attibutionFormItems = structuredClone(ATTRIBUTION_FORM_ITEMS);
		statementExplained = '';
		statementHasAnError = false;
		statementError = '';
	};

	const onInputKeyDown = (event: KeyboardEvent): void => {
		if (event.key === 'Enter') {
			event.preventDefault();
			interpretStatement();
		}
	};

	const getStatementComponents = (): string[] => {
		let statementComponents: string[] = [];
		if (statementToInterpret.includes(',')) {
			statementComponents = statementToInterpret.split(',').map((item: string) => item.trim());
			if (statementComponents.length > 0 && statementComponents[0].includes(' ')) {
				const firstElement: string = statementComponents[0];
				const [part1, ...rest] = firstElement.split(' ');
				statementComponents[0] = part1;
				statementComponents.splice(1, 0, rest.join(' '));
			}

			if (
				statementComponents.length > 0 &&
				statementComponents[statementComponents.length - 1].includes(' ')
			) {
				const lastElement: string = statementComponents[statementComponents.length - 1];
				const parts: string[] = lastElement.split(' ');
				statementComponents[statementComponents.length - 1] = parts.slice(0, -1).join(' ');
				statementComponents.push(parts[parts.length - 1]);
			}
		} else {
			statementComponents = statementToInterpret.trim().split(/\s+/);
		}
		console.log(statementComponents);
		return statementComponents;
	};

	const isValidIndex = (statementComponents: string[], index: number): boolean => {
		return statementComponents.length > index;
	};

	const interpretStatement = (): void => {
		resetState();

		let proportionOfContribution: string = '';

		let statementComponents: string[] = getStatementComponents();

		let nextIndexToEvaluate: number = 0;
		if (
			isValidIndex(statementComponents, nextIndexToEvaluate) &&
			statementComponents[nextIndexToEvaluate] === AIA
		) {
			nextIndexToEvaluate = 1;
		}
		for (
			let forIndex: number = nextIndexToEvaluate;
			forIndex < statementComponents.length;
			forIndex++
		) {
			if (isValidIndex(statementComponents, forIndex)) {
				const wordToEvaluate: string = statementComponents[forIndex];
				const validProportionOfContributionTag: boolean =
					PROPORTIONS_OF_CONTRIBUTIONS_TAGS.some((tag: TagI) => {
						if (wordToEvaluate === tag.name || wordToEvaluate === tag.abbreviation) {
							proportionOfContribution = tag.id;
							return true;
						}

						return false;
					}) &&
					!(
						attibutionFormItems[
							utilsService.getAttributionFormItemIndexByType(
								AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
								attibutionFormItems
							)
						].selectedOptions[0] !== ''
					);

				if (validProportionOfContributionTag) {
					attibutionFormItems[
						utilsService.getAttributionFormItemIndexByType(
							AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
							attibutionFormItems
						)
					].selectedOptions[0] = proportionOfContribution;
				}
			}
		}
		statementExplained = utilsService.getAttributionStatementExplanation(attibutionFormItems);
	};
</script>

<div class="section-container">
	<h1 class="section-title">Interpret an attribution statement</h1>
	<div class="statement-interpreter-container">
		<p class="section-text">Enter an attribution statement to learn what it means.</p>
		<div class="text-input-container">
			<TextInput
				class="text-input"
				hideLabel
				placeholder="Type or paste an AI attribution statement"
				invalid={statementToInterpret.trim() && statementHasAnError}
				invalidText={statementError}
				bind:value={statementToInterpret}
				on:input={() => {
					resetState();
				}}
				on:keydown={(event) => {
					onInputKeyDown(event);
				}}
			/>
			<Button
				class="interpret-statement-button"
				kind="secondary"
				icon={ArrowRight}
				on:click={() => {
					interpretStatement();
				}}
			>
				Interpret
			</Button>
		</div>
		{#if statementExplained.trim() && !statementHasAnError}
			<p class="explanation-title">Explanation</p>
			<p class="explanation-text">{statementExplained}</p>
		{/if}
	</div>
</div>

<TagLibrary />

<style lang="scss">
	@import '../../../styles/utils.scss';

	.statement-interpreter-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: calc(100% + 2 * $section-container-margin-left-right);
		margin: 0px calc(-1 * $section-container-margin-left-right);
		background-color: var(--cds-ui-01);
		padding: 20px 40px;
	}

	.text-input-container {
		display: flex;
	}

	:global(.interpret-statement-button) {
		max-height: 3rem;
	}

	.explanation-title {
		margin-top: 1rem;
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0px;
	}

	.explanation-text {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
	}
</style>
