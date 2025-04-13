<script lang="ts">
	import { type Component } from 'svelte';
	import { utilsService } from '$lib/services';
	import { AIA_EXPLANATION, VERSION_EXPLANATION } from '../create-attribution-statement/constants';
	import { AttributionType, type FormItemI } from '../create-attribution-statement/interfaces';

	export let attibutionFormItems: FormItemI[];

	const getConcatenatedOptionsIcons = (attributionType: AttributionType): Component[] => {
		return utilsService.getConcatenatedOptionsIcons(
			utilsService.getAttributionFormItemByType(attributionType, attibutionFormItems)
				.selectedOptions
		);
	};

	const getProportionsOfContributionIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			let proportionOfContributionAbbreviatedStatement: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
						attibutionFormItems
					).selectedOptions
				);
			const proportionOfContributionExplanations: string =
				utilsService.getConcatenatedOptionsExplanations(
					utilsService.getAttributionFormItemByType(
						AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
						attibutionFormItems
					).selectedOptions
				);
			if (proportionOfContributionAbbreviatedStatement) {
				proportionOfContributionAbbreviatedStatement += ':';
			}
			attributionIconsDescriptions = `${proportionOfContributionAbbreviatedStatement} ${proportionOfContributionExplanations}`;
		}
		return attributionIconsDescriptions;
	};

	const getAIContributionIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			let aiContributionAbbreviatedStatement: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.AI_CONTRIBUTION,
						attibutionFormItems
					).selectedOptions
				);
			const aiContributionExplanations: string = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			if (aiContributionAbbreviatedStatement) {
				aiContributionAbbreviatedStatement += ':';
			}
			attributionIconsDescriptions = `${aiContributionAbbreviatedStatement} ${aiContributionExplanations}`;
		}
		return attributionIconsDescriptions;
	};

	const getAIInitiativeIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			let aiInitiativeAbbreviatedStatement: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.AI_INITIATIVE,
						attibutionFormItems
					).selectedOptions
				);
			const aiInitiativeExplanations: string = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			if (aiInitiativeAbbreviatedStatement) {
				aiInitiativeAbbreviatedStatement += ':';
			}
			attributionIconsDescriptions = `${aiInitiativeAbbreviatedStatement} ${aiInitiativeExplanations}`;
		}
		return attributionIconsDescriptions;
	};

	const getHumanReviewIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			let humanReviewAbbreviatedStatement: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.HUMAN_REVIEW,
						attibutionFormItems
					).selectedOptions
				);
			const humanReviewExplanations: string = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			if (humanReviewAbbreviatedStatement) {
				humanReviewAbbreviatedStatement += ':';
			}
			attributionIconsDescriptions = `${humanReviewAbbreviatedStatement} ${humanReviewExplanations}`;
		}
		return attributionIconsDescriptions;
	};

	const attributionTypes = [
		{
			type: AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
			descriptionFunction: getProportionsOfContributionIconsDescriptions,
			iconsFunction: getConcatenatedOptionsIcons
		},
		{
			type: AttributionType.AI_CONTRIBUTION,
			descriptionFunction: getAIContributionIconsDescriptions,
			iconsFunction: getConcatenatedOptionsIcons
		},
		{
			type: AttributionType.AI_INITIATIVE,
			descriptionFunction: getAIInitiativeIconsDescriptions,
			iconsFunction: getConcatenatedOptionsIcons
		},
		{
			type: AttributionType.HUMAN_REVIEW,
			descriptionFunction: getHumanReviewIconsDescriptions,
			iconsFunction: getConcatenatedOptionsIcons
		}
	];

	const hasDescription = (): boolean => {
		return attributionTypes.some(({ descriptionFunction }) => descriptionFunction().trim() !== '');
	};
</script>

<p class="explanation-title">Explanation</p>

<div class="attribution-statement-explanation-text">
	{AIA_EXPLANATION}
</div>

{#if hasDescription()}
	<div class="attribution-icons-descriptions">
		{#each attributionTypes as { type, descriptionFunction, iconsFunction }}
			{#if descriptionFunction().trim()}
				<div class="attribution-icon-item-container">
					{#each iconsFunction(type) as icon}
						<div class="attribution-icon">
							<svelte:component this={icon} />
						</div>
					{/each}
					<span class="attribution-statement-icon-description">
						{descriptionFunction()}
					</span>
				</div>
			{/if}
		{/each}
	</div>
{/if}

<div class="attribution-statement-explanation-text">
	{VERSION_EXPLANATION}
</div>

<style lang="scss">
	@use '@carbon/type';

	.explanation-title {
		@include type.type-style('heading-02');
	}

	.attribution-statement-explanation-text,
	.attribution-statement-icon-description {
		@include type.type-style('body-short-01');
	}

	.attribution-statement-icon-description {
		align-self: center;
	}

	.attribution-icons-descriptions {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.attribution-icon-item-container {
		display: flex;
		align-items: flex-start;
		gap: 0.25rem;
	}

	.attribution-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 16px;
		height: 16px;
	}
</style>
