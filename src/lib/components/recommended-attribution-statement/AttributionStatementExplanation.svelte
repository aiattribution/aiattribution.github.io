<script lang="ts">
	import { type Component } from 'svelte';
	import { utilsService } from '$lib/services';
	import { AttributionType, type FormItemI } from '../attribution-statement/interfaces';

	export let attibutionFormItems: FormItemI[];

	const getAttributionStatementLabelContent = (): string => {
		let atributionStatementLabelContent: string = '';
		let proportionOfContribution: string = utilsService.getConcatenatedOptionsExplanations(
			utilsService.getAttributionFormItemByType(
				AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
				attibutionFormItems
			).selectedOptions
		);
		proportionOfContribution = proportionOfContribution.replace('The work', 'this work');
		proportionOfContribution = proportionOfContribution.replace('This work', 'this work');
		let modelUsed: string = '';
		let aiContribution: string = '';
		let aiInitiatives: string = '';
		let humanReview: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			if (
				utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
					.selectedOptions[0]
			) {
				const modelSelected: string = utilsService.getAttributionFormItemByType(
					AttributionType.MODEL,
					attibutionFormItems
				).selectedOptions[0];
				if (proportionOfContribution) {
					modelUsed = `, using ${modelSelected}.`;
				} else {
					modelUsed = `this work involved the use of ${modelSelected}.`;
				}
			}
			aiContribution = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			aiInitiatives = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			if (!proportionOfContribution && !modelUsed && !aiContribution) {
				aiInitiatives = utilsService.lowercaseFirstLetter(aiInitiatives);
			}
			humanReview = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			if (!proportionOfContribution && !modelUsed && !aiContribution && !aiInitiatives) {
				humanReview = utilsService.lowercaseFirstLetter(humanReview);
			}
		}
		atributionStatementLabelContent = `This attribution statement indicates that ${proportionOfContribution}${modelUsed} ${aiContribution} ${aiInitiatives} ${humanReview}`;
		atributionStatementLabelContent = atributionStatementLabelContent.replace('.,', ',');
		return atributionStatementLabelContent;
	};

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
</script>

<p class="explanation-title">Explanation</p>

<div class="attribution-statement-label">
	{getAttributionStatementLabelContent()}
</div>

<div class="attribution-statement-label">
	AIA: This prefix is used to identify an AI attribution statement.
</div>

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

<div class="attribution-statement-label">
	1.0: Version number of the attribution statement. The version will change as we update the
	components of the statement.
</div>

<style lang="scss">
	.explanation-title {
		font-family: IBM Plex Sans;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0px;
	}

	:global(.attribution-statement-label, .attribution-statement-icon-description) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
	}

	:global(.attribution-statement-icon-description) {
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
