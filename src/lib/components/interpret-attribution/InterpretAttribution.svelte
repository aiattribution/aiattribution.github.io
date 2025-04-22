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
	import { AIProportionOptions, type TagI } from '$lib/models/tag-library';
	import { utilsService } from '$lib/services';
	import {
		ATTRIBUTION_FORM_ITEMS,
		NO_AI_USED_ABBREVIATED_STATEMENT,
		NO_AI_USED_FULL_STATEMENT
	} from '../create-attribution-statement/constants';
	import {
		AttributionType,
		FormItemType,
		type FormItemI
	} from '../create-attribution-statement/interfaces';
	import type { AttributionTagI } from '../tag-library/interfaces';
	import { ATTRIBUTION_TAGS } from '../tag-library/constants';
	import { INTERPRET_ATTRIBUTION_SECTION_TITLE } from './constants';
	import { getStatementComponents } from './utils';

	let attributionFormItems: FormItemI[] = structuredClone(ATTRIBUTION_FORM_ITEMS);

	let statementToInterpret: string = '';
	let statementExplained: string = '';
	let statementHasAnError: boolean = false;
	let statementError: string = '';

	let attributionTags: AttributionTagI[] = ATTRIBUTION_TAGS;

	const targetAttributionTypes: AttributionType[] = [
		AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
		AttributionType.AI_CONTRIBUTION,
		AttributionType.AI_INITIATIVE,
		AttributionType.HUMAN_REVIEW
	];

	const resetState = (): void => {
		attributionFormItems = structuredClone(ATTRIBUTION_FORM_ITEMS);
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

	const isValidIndex = (statementComponents: string[], index: number): boolean => {
		return statementComponents.length > index;
	};

	const isValidTag = (
		attributionType: AttributionType,
		tags: TagI[],
		statementComponentToEvaluate: string
	): string[] => {
		let tagIds: string[] = [];
		const isValid: boolean = tags.some((tag: TagI) => {
			if (
				statementComponentToEvaluate === tag.name ||
				statementComponentToEvaluate === tag.abbreviation ||
				(tag.id === AIProportionOptions.ENTIRELY_HUMAN_CREATED &&
					(statementComponentToEvaluate === NO_AI_USED_ABBREVIATED_STATEMENT ||
						statementComponentToEvaluate === NO_AI_USED_FULL_STATEMENT))
			) {
				tagIds = [...tagIds, tag.id];
				return true;
			}

			return false;
		});
		if (!isValid) {
			const formItem: FormItemI = utilsService.getAttributionFormItemByType(
				attributionType,
				attributionFormItems
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
				const matches: RegExpMatchArray = statementComponentToEvaluate.match(regexPattern);

				if (matches && matches.join('') === statementComponentToEvaluate) {
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
			attributionFormItems
		);
		if (formItem.typeOfItem === FormItemType.radioButton) {
			isValid = !(
				attributionFormItems[
					utilsService.getAttributionFormItemIndexByType(attributionType, attributionFormItems)
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
			attributionFormItems
		);
		if (
			formItem.typeOfItem === FormItemType.radioButton ||
			formItem.typeOfItem === FormItemType.textInput
		) {
			attributionFormItems[
				utilsService.getAttributionFormItemIndexByType(attributionType, attributionFormItems)
			].selectedOptions[0] = selectedOptions[0];
		} else if (formItem.typeOfItem === FormItemType.checkbox) {
			selectedOptions.forEach((selectedOption: string) => {
				attributionFormItems[
					utilsService.getAttributionFormItemIndexByType(attributionType, attributionFormItems)
				].selectedOptions.push(selectedOption);
			});
		}
	};

	const identifyTags = (statementComponents: string[]): void => {
		let tagsIdIdentified: string[] = [];
		let attributionType: AttributionType = null;
		let model: string = null;

		for (let forIndex: number = 0; forIndex < statementComponents.length; forIndex++) {
			if (isValidIndex(statementComponents, forIndex)) {
				const statementComponentToEvaluate: string = statementComponents[forIndex];

				attributionType = AttributionType.PROPORTIONS_OF_CONTRIBUTIONS;
				tagsIdIdentified = isValidTag(
					attributionType,
					PROPORTIONS_OF_CONTRIBUTIONS_TAGS,
					statementComponentToEvaluate
				);
				const validProportionOfContributionTag: boolean =
					tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

				if (validProportionOfContributionTag) {
					addSelectedOption(attributionType, tagsIdIdentified);
				} else {
					attributionType = AttributionType.AI_CONTRIBUTION;
					tagsIdIdentified = isValidTag(
						attributionType,
						AI_CONTRIBUTIONS_TAGS,
						statementComponentToEvaluate
					);
					const validAIContributionTag: boolean =
						tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

					if (validAIContributionTag) {
						addSelectedOption(attributionType, tagsIdIdentified);
					} else {
						attributionType = AttributionType.AI_INITIATIVE;
						tagsIdIdentified = isValidTag(
							attributionType,
							AI_INITIATIVE_TAGS,
							statementComponentToEvaluate
						);
						const validAIInitiativeTag: boolean =
							tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

						if (validAIInitiativeTag) {
							addSelectedOption(attributionType, tagsIdIdentified);
						} else {
							attributionType = AttributionType.HUMAN_REVIEW;
							tagsIdIdentified = isValidTag(
								attributionType,
								HUMAN_REVIEW_TAGS,
								statementComponentToEvaluate
							);
							const validHumanReviewTag: boolean =
								tagsIdIdentified.length > 0 && isValidFormItemAccordingToTheType(attributionType);

							if (validHumanReviewTag) {
								addSelectedOption(attributionType, tagsIdIdentified);
							} else {
								if (model || forIndex !== statementComponents.length - 1) {
									statementHasAnError = true;
									statementError = `The following parts of the statement were not recognized: ${statementComponentToEvaluate}`;
									return;
								} else {
									model = statementComponentToEvaluate;
									addSelectedOption(AttributionType.MODEL, [model]);
								}
							}
						}
					}
				}
			}
		}
	};

	const verifyIfStatementIsValid = (): void => {
		for (let index: number = 0; index < attributionFormItems.length; index++) {
			if (
				attributionFormItems[index].attributionType === AttributionType.PROPORTIONS_OF_CONTRIBUTIONS
			) {
				if (
					attributionFormItems[index].selectedOptions[0] ===
					AIProportionOptions.ENTIRELY_HUMAN_CREATED
				) {
					const formItemFound: FormItemI = attributionFormItems.find(
						(attributionFormItem: FormItemI) => {
							if (
								attributionFormItem.attributionType !== AttributionType.PROPORTIONS_OF_CONTRIBUTIONS
							) {
								return (
									attributionFormItem.selectedOptions.length > 0 &&
									attributionFormItem.selectedOptions[0].trim() !== ''
								);
							}
						}
					);
					if (formItemFound) {
						statementHasAnError = true;
						statementError = `If this work was entirely human-created, without the use of AI, then it is not possible for ${formItemFound.selectedOptions[0]} to be part of the attribution statement.`;
						break;
					}
				}
			}
		}
	};

	const interpretStatement = (): void => {
		resetState();

		let statementComponents: string[] = getStatementComponents(statementToInterpret, ALL_TAGS);
		if (statementComponents.length === 0) {
			return;
		}

		identifyTags(statementComponents);
		verifyIfStatementIsValid();
		if (statementHasAnError) {
			return;
		}
		statementExplained = utilsService.getAttributionStatementExplanation(attributionFormItems);
		const selectedOptionsList: string[] = attributionFormItems
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
	<h1 class="section-title">{INTERPRET_ATTRIBUTION_SECTION_TITLE}</h1>
	<div class="statement-interpreter-container">
		<p class="section-text">Enter an attribution statement to learn what it means.</p>
		<div class="text-input-container">
			<TextInput
				class="interpret-statement-text-input"
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
		{#if statementToInterpret.trim() && statementExplained.trim() && !statementHasAnError}
			<p class="sub-title">Explanation</p>
			<div class="explanation-text-container">
				<p class="explanation-text">{statementExplained}</p>
			</div>
			<p class="sub-title">Components</p>
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

	:global(.interpret-statement-text-input) {
		@include type.type-style('body-short-02');
		background-color: var(--cds-field-02) !important;
		border: 1px solid #c6c6c6 !important;
		height: 3rem !important;
	}

	:global(.interpret-statement-button) {
		max-height: 3rem;
	}

	.sub-title {
		margin-top: 6px;
		@include type.type-style('productive-heading-03');
	}

	.explanation-text-container {
		display: flex;
		width: 100%;
		padding: 16px;
		gap: 10px;
		background-color: white;
		border: 1px solid #c6c6c6;
	}

	.explanation-text {
		@include type.type-style('body-short-02');
	}

	.attribution-tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 6px;
	}

	:global(.attribution-tags-container .attribution-tag-container) {
		gap: 1rem !important;
	}

	:global(.attribution-tags-container .attribution-tag-title.attribution-tag-title) {
		@include type.type-style('productive-heading-02');
	}

	:global(.attribution-tags-container .tag-tile) {
		background-color: var(--cds-ui-02) !important;
		border: unset;
		box-shadow: 0 0 0 1px #c6c6c6;
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
