<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import {
		AI_USED,
		AIA,
		NO_AI_USED_ABBREVIATED_STATEMENT,
		NO_AI_USED_FULL_STATEMENT,
		VERSION
	} from './constants';
	import { AttributionType, type FormItemI } from './interfaces';
	import { utilsService } from '$lib/services';

	export let attibutionFormItems: FormItemI[];

	const getAbbreviatedStatement = (): string => {
		let abbreviatedStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (
			utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
				.selectedOptions[0] &&
			isAIUsageOptionYes
		) {
			aiUsed = utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
				.selectedOptions[0];
		} else if (isAIUsageOptionYes) {
			aiUsed = AI_USED;
		} else {
			aiUsed = NO_AI_USED_ABBREVIATED_STATEMENT;
		}

		if (isAIUsageOptionYes) {
			const aiContribution: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			const proportionOfContribution: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
						attibutionFormItems
					).selectedOptions
				);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			const humanReview: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			abbreviatedStatement = `${AIA} ${aiUsed} ${aiContribution} ${proportionOfContribution} ${aiInitiatives} ${humanReview} ${VERSION}`;
		} else {
			abbreviatedStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return abbreviatedStatement;
	};

	const getFullStatement = (): string => {
		let fullStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (
			utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
				.selectedOptions[0] &&
			isAIUsageOptionYes
		) {
			aiUsed = utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
				.selectedOptions[0];
		} else if (isAIUsageOptionYes) {
			aiUsed = AI_USED;
		} else {
			aiUsed = NO_AI_USED_FULL_STATEMENT;
		}

		if (isAIUsageOptionYes) {
			const aiContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			const proportionOfContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			const humanReview: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			fullStatement = `${AIA} ${aiUsed}${aiContribution}${proportionOfContribution}${aiInitiatives}${humanReview} ${VERSION}`;
		} else {
			fullStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return fullStatement;
	};

	const getAttributionTagLabelContent = (): string => {
		let atributionTagLabelContent: string = '';
		let aiUsed: string = '';
		let modelUsed: string = '';
		let aiContribution: string = '';
		let proportionOfContribution: string = '';
		let aiInitiatives: string = '';
		let humanReview: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			aiUsed = 'AI was used';
			if (
				utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
					.selectedOptions[0]
			) {
				modelUsed = `with ${utilsService.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems).selectedOptions[0]}`;
			}
			aiContribution = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			proportionOfContribution = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions
			);
			aiInitiatives = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			humanReview = utilsService.getConcatenatedOptionsExplanations(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
		} else {
			aiUsed = 'AI was not used in any way';
		}
		atributionTagLabelContent = `This attribution tag indicates that ${aiUsed} to create this content ${modelUsed}. ${aiContribution} ${proportionOfContribution} ${aiInitiatives} ${humanReview}`;
		return atributionTagLabelContent;
	};

	const getAttributionIcons = (): string => {
		let attributionIcons: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			const aiContribution: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
			const proportionOfContribution: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
			const humanReview: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			attributionIcons = `${aiContribution} ${proportionOfContribution} ${aiInitiatives} ${humanReview}`;
		}
		return attributionIcons;
	};

	const getAIContributionIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			const aiContributionIcons: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions
			);
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
			attributionIconsDescriptions = `${aiContributionIcons}<span class="attribution-tag-label">${aiContributionAbbreviatedStatement} ${aiContributionExplanations}</span>`;
		}
		return attributionIconsDescriptions;
	};

	const getProportionsOfContributionIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			const proportionOfContributionIcons: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions
			);
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
			attributionIconsDescriptions = `${proportionOfContributionIcons}<span class="attribution-tag-label">${proportionOfContributionAbbreviatedStatement} ${proportionOfContributionExplanations}</span>`;
		}
		return attributionIconsDescriptions;
	};

	const getAIInitiativeIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			const aiInitiativeIcons: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions
			);
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
			attributionIconsDescriptions = `${aiInitiativeIcons}<span class="attribution-tag-label">${aiInitiativeAbbreviatedStatement} ${aiInitiativeExplanations}</span>`;
		}
		return attributionIconsDescriptions;
	};

	const getHumanReviewIconsDescriptions = (): string => {
		let attributionIconsDescriptions: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			const humanReviewIcons: string = utilsService.getConcatenatedOptionsIcons(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
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
			attributionIconsDescriptions = `${humanReviewIcons}<span class="attribution-tag-label">${humanReviewAbbreviatedStatement} ${humanReviewExplanations}</span>`;
		}
		return attributionIconsDescriptions;
	};
</script>

<h2 class="recommended-attribution-title">Recommended attribution</h2>

{#if utilsService.getAttributionFormItemByType(AttributionType.AI_USED, attibutionFormItems).selectedOptions[0]}
	<div class="recommended-attribution-item-container">
		<div class="recommended-attribution-item-label">
			<p>Abbreviated statement</p>
		</div>
		<div class="recommended-attribution-item">
			<div class="recommended-attribution-item-text-container">
				<p class="recommended-attribution-item-text">{getAbbreviatedStatement()}</p>
				<div class="recommended-attribution-item-icons-container">
					{@html getAttributionIcons()}
				</div>
			</div>
			<div>
				<Button kind="ghost" iconDescription="Copy" icon={Copy} on:click={() => {}} />
			</div>
			<div>
				<Button kind="ghost" iconDescription="Download" icon={Download} on:click={() => {}} />
			</div>
		</div>
	</div>

	<div class="recommended-attribution-item-container">
		<div class="recommended-attribution-item-label">
			<p>Full statement</p>
		</div>
		<div class="recommended-attribution-item">
			<div class="recommended-attribution-item-text-container">
				<p class="recommended-attribution-item-text">{getFullStatement()}</p>
				<div class="recommended-attribution-item-icons-container">
					{@html getAttributionIcons()}
				</div>
			</div>
			<div>
				<Button kind="ghost" iconDescription="Copy" icon={Copy} on:click={() => {}} />
			</div>
			<div>
				<Button kind="ghost" iconDescription="Download" icon={Download} on:click={() => {}} />
			</div>
		</div>
	</div>

	<div class="attribution-tag-label">
		{getAttributionTagLabelContent()}
	</div>

	<div class="attribution-icons-descriptions">
		<div class="attribution-icon-item-container">
			{@html getAIContributionIconsDescriptions()}
		</div>
		<div class="attribution-icon-item-container">
			{@html getProportionsOfContributionIconsDescriptions()}
		</div>
		<div class="attribution-icon-item-container">
			{@html getAIInitiativeIconsDescriptions()}
		</div>
		<div class="attribution-icon-item-container">
			{@html getHumanReviewIconsDescriptions()}
		</div>
	</div>
{/if}

<style lang="scss">
	.recommended-attribution-title {
		font-family: IBM Plex Sans;
		font-weight: 700;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0px;
	}

	.recommended-attribution-item-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.recommended-attribution-item-label {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
		color: #525252;
	}

	.recommended-attribution-item {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: var(--cds-ui-02);
	}

	.recommended-attribution-item-text-container {
		display: flex;
		flex-grow: 1;
		gap: 0.5rem;
		margin-left: 10.5px;
	}

	.recommended-attribution-item-text {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	.recommended-attribution-item-icons-container {
		display: flex;
		gap: 0.5rem;
	}

	.attribution-tag-label {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.32px;
	}

	.attribution-icons-descriptions {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.attribution-icon-item-container {
		display: flex;
		align-items: center;
		gap: 0.125rem;
	}
</style>
