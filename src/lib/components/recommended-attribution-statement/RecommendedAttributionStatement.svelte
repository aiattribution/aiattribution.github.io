<script lang="ts">
	import { onDestroy, onMount, type Component } from 'svelte';
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { AIA, NO_AI_USED_FULL_STATEMENT, VERSION } from '../attribution-statement/constants';
	import { AttributionType, type FormItemI } from '../attribution-statement/interfaces';
	import { apiService, utilsService } from '$lib/services';
	import { AbbreviatedStatement } from '$lib';

	export let attibutionFormItems: FormItemI[];

	let fullStatementHTMLContainer: HTMLDivElement = null;

	onMount(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('beforeunload', handleBeforeUnload);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		}
	});

	const handleBeforeUnload = (event) => {
		event.preventDefault();
		const statement: string = getFullStatement().split(/\s+/).join(' ');
		apiService.updateCloseActions({
			includeNumberOfActionsOnAbbreviatedStatements: false,
			includeNumberOfActionsOnFullStatements: false,
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
		});
		return;
	};

	const hasAnyResponseToAnyFormItem = (): boolean => {
		return attibutionFormItems.some(
			(item: FormItemI) => item.selectedOptions.length > 0 && item.selectedOptions[0]
		);
	};

	const getFullStatement = (): string => {
		let fullStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		const modelSelected: string = utilsService.getAttributionFormItemByType(
			AttributionType.MODEL,
			attibutionFormItems
		).selectedOptions[0];

		if (isAIUsageOptionYes) {
			const proportionOfContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
					attibutionFormItems
				).selectedOptions,
				false
			);
			if (modelSelected) {
				if (proportionOfContribution) {
					aiUsed = `, ${modelSelected}`;
				} else {
					aiUsed = modelSelected;
				}
			} else {
				aiUsed = '';
			}
			const aiContribution: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
					attibutionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed ? true : false
			);
			const aiInitiatives: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_INITIATIVE,
					attibutionFormItems
				).selectedOptions,
				proportionOfContribution || aiUsed || aiContribution ? true : false
			);
			const humanReview: string = utilsService.getConcatenatedOptionsFullStatement(
				utilsService.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions,
				proportionOfContribution || aiUsed || aiContribution || aiInitiatives ? true : false
			);
			fullStatement = `${AIA} ${proportionOfContribution}${aiUsed}${aiContribution}${aiInitiatives}${humanReview} ${VERSION}`;
		} else {
			aiUsed = NO_AI_USED_FULL_STATEMENT;
			fullStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return fullStatement;
	};

	const getAttributionTagLabelContent = (): string => {
		let atributionTagLabelContent: string = '';
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
		atributionTagLabelContent = `This attribution tag indicates that ${proportionOfContribution}${modelUsed} ${aiContribution} ${aiInitiatives} ${humanReview}`;
		atributionTagLabelContent = atributionTagLabelContent.replace('.,', ',');
		return atributionTagLabelContent;
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
			attributionIconsDescriptions = `<span class="attribution-tag-icon-description">${proportionOfContributionAbbreviatedStatement} ${proportionOfContributionExplanations}</span>`;
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
			attributionIconsDescriptions = `<span class="attribution-tag-icon-description">${aiContributionAbbreviatedStatement} ${aiContributionExplanations}</span>`;
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
			attributionIconsDescriptions = `<span class="attribution-tag-icon-description">${aiInitiativeAbbreviatedStatement} ${aiInitiativeExplanations}</span>`;
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
			attributionIconsDescriptions = `<span class="attribution-tag-icon-description">${humanReviewAbbreviatedStatement} ${humanReviewExplanations}</span>`;
		}
		return attributionIconsDescriptions;
	};

	const copyFullStatementToClipboard = async (): Promise<void> => {
		try {
			const statement: string = getFullStatement().split(/\s+/).join(' ');
			await navigator.clipboard.writeText(statement);
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: false,
				includeNumberOfActionsOnFullStatements: true,
				statementDisplayed: statement,
				fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
				fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
				optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
			});
		} catch (err) {
			console.error('Error copying full statement to clipboard', err);
		}
	};

	const downloadFullStatementSVG = (): void => {
		utilsService.downloadStatementSVG(fullStatementHTMLContainer, 'full_statement');
		const statement: string = getFullStatement().split(/\s+/).join(' ');
		apiService.updateDownloadActions({
			includeNumberOfActionsOnAbbreviatedStatements: false,
			includeNumberOfActionsOnFullStatements: true,
			statementDisplayed: statement,
			fieldsFilledOut: utilsService.getFieldsFilledOut(attibutionFormItems),
			fieldsLeftBlank: utilsService.getFieldsLeftBlank(attibutionFormItems),
			optionsSelectedPerField: utilsService.getOptionsSelectedPerField(attibutionFormItems)
		});
	};
</script>

<h2 class="recommended-attribution-title">Recommended attribution statement</h2>

{#if hasAnyResponseToAnyFormItem()}
	<AbbreviatedStatement {attibutionFormItems} />
	<div class="recommended-attribution-item-container">
		<div class="recommended-attribution-item-label">
			<p>Full statement</p>
		</div>
		<div class="recommended-attribution-item">
			<div
				bind:this={fullStatementHTMLContainer}
				class="recommended-attribution-item-text-container"
			>
				<div class="recommended-attribution-item-text">{getFullStatement()}</div>
				<div class="recommended-attribution-item-icons-container">
					{#each utilsService.getAttributionIcons(attibutionFormItems) as AttributionIcon}
						<svelte:component this={AttributionIcon} />
					{/each}
				</div>
			</div>
			<div class="recommended-attribution-item-button-container">
				<Button
					kind="ghost"
					iconDescription="Copy"
					icon={Copy}
					on:click={async () => {
						await copyFullStatementToClipboard();
					}}
				/>
			</div>
			<div class="recommended-attribution-item-button-container">
				<Button
					kind="ghost"
					iconDescription="Download"
					icon={Download}
					on:click={() => {
						downloadFullStatementSVG();
					}}
				/>
			</div>
		</div>
	</div>

	<div class="attribution-tag-label">
		{getAttributionTagLabelContent()}
	</div>

	<div class="attribution-icons-descriptions">
		<div class="attribution-icon-item-container">
			{#each getConcatenatedOptionsIcons(AttributionType.PROPORTIONS_OF_CONTRIBUTIONS) as icon}
				{#if getProportionsOfContributionIconsDescriptions()}
					<div>
						<svelte:component this={icon} />
					</div>
				{/if}
			{/each}
			{@html getProportionsOfContributionIconsDescriptions()}
		</div>
		<div class="attribution-icon-item-container">
			{#each getConcatenatedOptionsIcons(AttributionType.AI_CONTRIBUTION) as icon}
				<div>
					<svelte:component this={icon} />
				</div>
			{/each}
			{@html getAIContributionIconsDescriptions()}
		</div>
		<div class="attribution-icon-item-container">
			{#each getConcatenatedOptionsIcons(AttributionType.AI_INITIATIVE) as icon}
				<div>
					<svelte:component this={icon} />
				</div>
			{/each}
			{@html getAIInitiativeIconsDescriptions()}
		</div>
		<div class="attribution-icon-item-container">
			{#each getConcatenatedOptionsIcons(AttributionType.HUMAN_REVIEW) as icon}
				<div>
					<svelte:component this={icon} />
				</div>
			{/each}
			{@html getHumanReviewIconsDescriptions()}
		</div>
	</div>
{/if}

<style lang="scss">
	.recommended-attribution-title {
		font-family: IBM Plex Sans;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0px;
	}

	:global(.recommended-attribution-item-container) {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	:global(.recommended-attribution-item-label) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
		color: #525252;
	}

	:global(.recommended-attribution-item) {
		display: flex;
		align-items: center;
		width: 100%;
		background-color: var(--cds-ui-02);
	}

	:global(.recommended-attribution-item-text-container) {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		flex-grow: 1;
		gap: 0.5rem;
		margin-left: 10.5px;
		padding: 8px 0;
	}

	:global(.recommended-attribution-item-text) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	:global(.recommended-attribution-item-icons-container) {
		display: flex;
		gap: 0.5rem;
	}

	:global(.recommended-attribution-item-button-container) {
		display: flex;
		align-items: flex-start;
		height: 100%;
	}

	:global(.attribution-tag-label, .attribution-tag-icon-description) {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.32px;
	}

	:global(.attribution-tag-icon-description) {
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
</style>
