<script lang="ts">
	import { type Component } from 'svelte';
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import {
		AIA,
		NO_AI_USED_ABBREVIATED_STATEMENT,
		NO_AI_USED_FULL_STATEMENT,
		VERSION
	} from './constants';
	import { AttributionType, type FormItemI } from './interfaces';
	import { ALL_TAGS } from '$lib/common/constants';
	import type { TagI } from '$lib/models/tag-library';
	import { apiService, utilsService } from '$lib/services';

	export let attibutionFormItems: FormItemI[];

	let abbreviatedStatementHTMLContainer: HTMLDivElement = null;
	let fullStatementHTMLContainer: HTMLDivElement = null;

	const hasAnyResponseToAnyFormItem = (): boolean => {
		return attibutionFormItems.some(
			(item: FormItemI) => item.selectedOptions.length > 0 && item.selectedOptions[0]
		);
	};

	const getAbbreviatedStatement = (): string => {
		let abbreviatedStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean = utilsService.isAIUsageOptionYes(attibutionFormItems);
		const modelSelected: string = utilsService.getAttributionFormItemByType(
			AttributionType.MODEL,
			attibutionFormItems
		).selectedOptions[0];
		if (isAIUsageOptionYes) {
			aiUsed = modelSelected.length > 0 ? modelSelected : '';
		} else {
			aiUsed = NO_AI_USED_ABBREVIATED_STATEMENT;
		}

		if (isAIUsageOptionYes) {
			const proportionOfContribution: string =
				utilsService.getConcatenatedOptionsAbbreviatedStatement(
					utilsService.getAttributionFormItemByType(
						AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
						attibutionFormItems
					).selectedOptions
				);
			const aiContribution: string = utilsService.getConcatenatedOptionsAbbreviatedStatement(
				utilsService.getAttributionFormItemByType(
					AttributionType.AI_CONTRIBUTION,
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
			abbreviatedStatement = `${AIA} ${proportionOfContribution} ${aiUsed} ${aiContribution} ${aiInitiatives} ${humanReview} ${VERSION}`;
		} else {
			abbreviatedStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return abbreviatedStatement;
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

	const getAttributionIcons = (): Component[] => {
		let icons: Component[] = [];
		const isAIUsageOptionYes = utilsService.isAIUsageOptionYes(attibutionFormItems);

		const getIconsFromOptions = (type: AttributionType) => {
			return utilsService
				.getAttributionFormItemByType(type, attibutionFormItems)
				.selectedOptions.map((option: string) => {
					const tag: TagI = ALL_TAGS.find((tag: TagI) => tag.id === option);
					return tag ? tag.iconComponent : null;
				})
				.filter(Boolean);
		};

		icons = [...getIconsFromOptions(AttributionType.PROPORTIONS_OF_CONTRIBUTIONS)];

		if (isAIUsageOptionYes) {
			icons = [
				...icons,
				...getIconsFromOptions(AttributionType.AI_CONTRIBUTION),
				...getIconsFromOptions(AttributionType.AI_INITIATIVE),
				...getIconsFromOptions(AttributionType.HUMAN_REVIEW)
			];
		}

		return icons;
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

	const getFieldsFilledOut = (): string[] => {
		return attibutionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length > 0 &&
					item.selectedOptions.some((option: string) => option && option !== '')
			)
			.map((item: FormItemI) => item.text);
	};

	const getFieldsLeftBlank = (): string[] => {
		return attibutionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length === 0 ||
					item.selectedOptions.every((option: string) => !option || option === '')
			)
			.map((item: FormItemI) => item.text);
	};

	const getOptionsSelectedPerField = (): Record<string, string[]> => {
		return attibutionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length > 0 &&
					item.selectedOptions.some((option: string) => option && option !== '')
			)
			.reduce(
				(acc: Record<string, string[]>, item: FormItemI) => {
					acc[item.text] = item.selectedOptions;
					return acc;
				},
				{} as Record<string, string[]>
			);
	};

	const copyAbbreviatedStatementToClipboard = async (): Promise<void> => {
		try {
			const text: string = getAbbreviatedStatement().split(/\s+/).join(' ');
			await navigator.clipboard.writeText(text);
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: true,
				includeNumberOfActionsOnFullStatements: false,
				statementDisplayed: text,
				fieldsFilledOut: getFieldsFilledOut(),
				fieldsLeftBlank: getFieldsLeftBlank(),
				optionsSelectedPerField: getOptionsSelectedPerField()
			});
		} catch (err) {
			console.error('Error copying abbreviated statement to clipboard', err);
		}
	};

	const copyFullStatementToClipboard = async (): Promise<void> => {
		try {
			const text: string = getFullStatement().split(/\s+/).join(' ');
			await navigator.clipboard.writeText(text);
			apiService.updateCopyActions({
				includeNumberOfActionsOnAbbreviatedStatements: false,
				includeNumberOfActionsOnFullStatements: true,
				statementDisplayed: text,
				fieldsFilledOut: getFieldsFilledOut(),
				fieldsLeftBlank: getFieldsLeftBlank(),
				optionsSelectedPerField: getOptionsSelectedPerField()
			});
		} catch (err) {
			console.error('Error copying full statement to clipboard', err);
		}
	};

	const downloadStatementSVG = (
		statementHTMLContainer: HTMLDivElement,
		downloadName: string
	): void => {
		if (!statementHTMLContainer) return;

		const textElement: Element = statementHTMLContainer.querySelector(
			'.recommended-attribution-item-text'
		);
		const iconsContainer: Element = statementHTMLContainer.querySelector(
			'.recommended-attribution-item-icons-container'
		);

		const textContent: string = textElement?.textContent?.trim() || '';
		const iconsHTML: string = iconsContainer?.innerHTML || '';

		const getTextWidth = (text: string, font: string): number => {
			const canvas: HTMLCanvasElement = document.createElement('canvas');
			const context: CanvasRenderingContext2D = canvas.getContext('2d');
			if (context) {
				context.font = font;
				return context.measureText(text).width;
			}
			return 0;
		};

		const fontStyle: CSSStyleDeclaration = window.getComputedStyle(textElement || document.body);
		const font: string = `${fontStyle.fontWeight} ${fontStyle.fontSize} ${fontStyle.fontFamily}`;

		const textWidth: number = getTextWidth(textContent, font);
		const iconsWidth: number = iconsContainer?.getBoundingClientRect().width || 0;
		const svgWidth: number = textWidth + iconsWidth + 24;

		const svgContent: string = `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="40px">
	<foreignObject width="100%" height="100%">
		<style>
			.recommended-attribution-item-text-container {
				display: flex;
				align-items: center;
				white-space: nowrap;
				gap: 0.5rem;
				padding: 8px;
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
		</style>
		<div xmlns="http://www.w3.org/1999/xhtml" class="recommended-attribution-item-text-container">
			<div class="recommended-attribution-item-text">${textContent}</div>
			<div class="recommended-attribution-item-icons-container">${iconsHTML}</div>
		</div>
	</foreignObject>
</svg>`;

		const blob: Blob = new Blob([svgContent], { type: 'image/svg+xml' });
		const url: string = URL.createObjectURL(blob);

		const link: HTMLAnchorElement = document.createElement('a');
		link.href = url;
		link.download = `${downloadName}.svg`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	const downloadAbbreviatedStatementSVG = (): void => {
		downloadStatementSVG(abbreviatedStatementHTMLContainer, 'abbreviated_statement');
	};

	const downloadFullStatementSVG = (): void => {
		downloadStatementSVG(fullStatementHTMLContainer, 'full_statement');
	};
</script>

<h2 class="recommended-attribution-title">Recommended attribution</h2>

{#if hasAnyResponseToAnyFormItem()}
	<div class="recommended-attribution-item-container">
		<div class="recommended-attribution-item-label">
			<p>Abbreviated statement</p>
		</div>
		<div class="recommended-attribution-item">
			<div
				bind:this={abbreviatedStatementHTMLContainer}
				class="recommended-attribution-item-text-container"
			>
				<div class="recommended-attribution-item-text">{getAbbreviatedStatement()}</div>
				<div class="recommended-attribution-item-icons-container">
					{#each getAttributionIcons() as AttributionIcon}
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
						await copyAbbreviatedStatementToClipboard();
					}}
				/>
			</div>
			<div class="recommended-attribution-item-button-container">
				<Button
					kind="ghost"
					iconDescription="Download"
					icon={Download}
					on:click={() => {
						downloadAbbreviatedStatementSVG();
					}}
				/>
			</div>
		</div>
	</div>

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
					{#each getAttributionIcons() as AttributionIcon}
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
		align-items: center;
		flex-wrap: wrap;
		flex-grow: 1;
		gap: 0.5rem;
		margin-left: 10.5px;
		padding: 8px 0;
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

	.recommended-attribution-item-button-container {
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
