<script lang="ts">
	import { Button, TextInput } from 'carbon-components-svelte';
	import { ArrowRight } from 'carbon-icons-svelte';
	import { AttributionTag, TagLibrary } from '$lib';
	import {
		AI_CONTRIBUTIONS_TAGS,
		AI_INITIATIVE_TAGS,
		ALL_TAGS,
		HUMAN_REVIEW_TAGS,
		PROPORTIONS_OF_CONTRIBUTIONS_TAGS
	} from '$lib/common/constants';
	import type { TagI } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import { AIA, ATTRIBUTION_FORM_ITEMS, VERSION } from '../create-attribution-statement/constants';
	import {
		AttributionType,
		FormItemType,
		type FormItemI
	} from '../create-attribution-statement/interfaces';
	import type { AttributionTagI } from '../tag-library/interfaces';
	import { ATTRIBUTION_TAGS } from '../tag-library/constants';

	let attibutionFormItems: FormItemI[] = structuredClone(ATTRIBUTION_FORM_ITEMS);

	let statementToInterpret: string = '';
	let statementExplained: string = '';
	let statementHasAnError: boolean = false;
	let statementError: string = '';

	let attributionTags: AttributionTagI[] = ATTRIBUTION_TAGS;

	const resetState = (): void => {
		attibutionFormItems = structuredClone(ATTRIBUTION_FORM_ITEMS);
		attributionTags = ATTRIBUTION_TAGS;
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
		} else {
			statementComponents = statementToInterpret.trim().split(/\s+/);
		}
		if (statementComponents.length > 0) {
			const lastElement: string = statementComponents[statementComponents.length - 1];
			if (lastElement === VERSION) {
				statementComponents.pop();
			} else if (lastElement.includes(' ') && lastElement.endsWith(VERSION)) {
				const parts: string[] = lastElement.split(' ');
				statementComponents[statementComponents.length - 1] = parts.slice(0, -1).join(' ');
			}
		}

		console.log(statementComponents);
		return statementComponents;
	};

	const isValidIndex = (statementComponents: string[], index: number): boolean => {
		return statementComponents.length > index;
	};

	const isValidTag = (
		attributionType: AttributionType,
		tags: TagI[],
		wordToEvaluate: string
	): string[] => {
		let tagIds: string[] = [];
		const isValid: boolean = tags.some((tag: TagI) => {
			if (wordToEvaluate === tag.name || wordToEvaluate === tag.abbreviation) {
				tagIds = [...tagIds, tag.id];
				return true;
			}

			return false;
		});
		if (!isValid) {
			const formItem: FormItemI = utilsService.getAttributionFormItemByType(
				attributionType,
				attibutionFormItems
			);
			if (formItem.typeOfItem === FormItemType.checkbox) {
				const abbreviations: string[] = tags.map((tag: TagI) => tag.abbreviation);
				const abbreviationToId: Record<string, string> = tags.reduce(
					(map: Record<string, string>, tag: TagI) => {
						map[tag.abbreviation] = tag.id;
						return map;
					},
					{} as Record<string, string>
				);

				const regexPattern: RegExp = new RegExp(`(${abbreviations.join('|')})`, 'g');
				const matches: RegExpMatchArray = wordToEvaluate.match(regexPattern);

				if (matches && matches.join('') === wordToEvaluate) {
					tagIds = matches.map((match: string) => abbreviationToId[match]);
				}
			}
		}
		return tagIds;
	};

	const isValidFormItemAccordingToTheType = (attributionType: AttributionType): boolean => {
		let isValid: boolean = false;
		const formItem: FormItemI = utilsService.getAttributionFormItemByType(
			attributionType,
			attibutionFormItems
		);
		if (formItem.typeOfItem === FormItemType.radioButton) {
			isValid = !(
				attibutionFormItems[
					utilsService.getAttributionFormItemIndexByType(attributionType, attibutionFormItems)
				].selectedOptions[0] !== ''
			);
		} else if (formItem.typeOfItem === FormItemType.checkbox) {
			isValid = true;
		}
		return isValid;
	};

	const addSelectedOption = (attributionType: AttributionType, selectedOptions: string[]): void => {
		const formItem: FormItemI = utilsService.getAttributionFormItemByType(
			attributionType,
			attibutionFormItems
		);
		if (
			formItem.typeOfItem === FormItemType.radioButton ||
			formItem.typeOfItem === FormItemType.textInput
		) {
			attibutionFormItems[
				utilsService.getAttributionFormItemIndexByType(attributionType, attibutionFormItems)
			].selectedOptions[0] = selectedOptions[0];
		} else if (formItem.typeOfItem === FormItemType.checkbox) {
			selectedOptions.forEach((selectedOption: string) => {
				attibutionFormItems[
					utilsService.getAttributionFormItemIndexByType(attributionType, attibutionFormItems)
				].selectedOptions.push(selectedOption);
			});
		}
	};

	const interpretStatement = (): void => {
		resetState();

		let tagsIdIdentified: string[] = [];

		let statementComponents: string[] = getStatementComponents();
		let attributionType: AttributionType = null;
		let model: string = null;

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

				attributionType = AttributionType.PROPORTIONS_OF_CONTRIBUTIONS;
				tagsIdIdentified = isValidTag(
					attributionType,
					PROPORTIONS_OF_CONTRIBUTIONS_TAGS,
					wordToEvaluate
				);
				const validProportionOfContributionTag: boolean =
					tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

				if (validProportionOfContributionTag) {
					addSelectedOption(attributionType, tagsIdIdentified);
				} else {
					attributionType = AttributionType.AI_CONTRIBUTION;
					tagsIdIdentified = isValidTag(attributionType, AI_CONTRIBUTIONS_TAGS, wordToEvaluate);
					const validAIContributionTag: boolean =
						tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

					if (validAIContributionTag) {
						addSelectedOption(attributionType, tagsIdIdentified);
					} else {
						attributionType = AttributionType.AI_INITIATIVE;
						tagsIdIdentified = isValidTag(attributionType, AI_INITIATIVE_TAGS, wordToEvaluate);
						const validAIInitiativeTag: boolean =
							tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

						if (validAIInitiativeTag) {
							addSelectedOption(attributionType, tagsIdIdentified);
						} else {
							attributionType = AttributionType.HUMAN_REVIEW;
							tagsIdIdentified = isValidTag(attributionType, HUMAN_REVIEW_TAGS, wordToEvaluate);
							const validHumanReviewTag: boolean =
								tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

							if (validHumanReviewTag) {
								addSelectedOption(attributionType, tagsIdIdentified);
							} else {
								if (model || forIndex !== statementComponents.length - 1) {
									statementHasAnError = true;
									statementError = `The following parts of the statement were not recognized: ${wordToEvaluate}`;
									return;
								} else {
									model = wordToEvaluate;
									addSelectedOption(AttributionType.MODEL, [model]);
								}
							}
						}
					}
				}
			}
		}
		statementExplained = utilsService.getAttributionStatementExplanation(attibutionFormItems);
		const targetAttributionTypes: AttributionType[] = [
			AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
			AttributionType.AI_CONTRIBUTION,
			AttributionType.AI_INITIATIVE,
			AttributionType.HUMAN_REVIEW
		];
		const selectedOptionsList: string[] = attibutionFormItems
			.filter((item: FormItemI) => targetAttributionTypes.includes(item.attributionType))
			.flatMap((item: FormItemI) => item.selectedOptions)
			.filter((selectedOption: string) => selectedOption.trim());
		const tagsIdentified: TagI[] = selectedOptionsList.map((selectedOption: string) => {
			return ALL_TAGS.find((tag: TagI) => tag.id === selectedOption);
		});
		attributionTags = attributionTags.map((attributionTag: AttributionTagI) => {
			const filteredTags: TagI[] = attributionTag.tags.filter((tag: TagI) =>
				tagsIdentified.some((identifiedTag: TagI) => identifiedTag.id === tag.id)
			);

			return {
				...attributionTag,
				tags: filteredTags
			};
		});
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
			<div class="attribution-tags-container">
				{#each attributionTags as attributionTag (attributionTag.id)}
					{#if attributionTag.tags.length > 0}
						<AttributionTag {attributionTag} />
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>

<TagLibrary />

<style lang="scss">
	@use '@carbon/type';
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
		@include type.type-style('productive-heading-03');
	}

	.explanation-text {
		@include type.type-style('body-short-01');
	}

	.attribution-tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}

	:global(.attribution-tags-container .attribution-tag-title.attribution-tag-title) {
		@include type.type-style('productive-heading-02');
	}

	:global(.attribution-tags-container .tag-tile) {
		background-color: var(--cds-ui-02) !important;
		border: unset;
		box-shadow: 0 0 0 1px var(--cds-border-interactive);
	}

	@media (max-width: 1055px) {
		.statement-interpreter-container {
			width: calc(100% + 2 * 16px);
			margin: 0 -16px;
			padding: 20px;
		}

		:global(.attribution-tags-container .attribution-tag-container) {
			width: 100%;
		}
	}

	@media (max-width: 480px) {
		:global(.attribution-tags-container .tag-tile) {
			border: 1px solid var(--cds-border-interactive);
			box-shadow: unset;
		}
	}
</style>
