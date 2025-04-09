import { ALL_TAGS } from '$lib/common/constants';
import {
	AttributionType,
	type FormItemI
} from '$lib/components/create-attribution-statement/interfaces';
import { AIProportionOptions, type TagI } from '$lib/models/tag-library';
import type { Component } from 'svelte';
import { v4 as uuidv4 } from 'uuid';

class UtilsService {
	constructor() {}

	public getUniqueId(): string {
		return uuidv4().toString();
	}

	public getAttributionFormItemByType(
		attributionType: AttributionType,
		attibutionFormItems: FormItemI[]
	): FormItemI {
		return attibutionFormItems.find((formItem: FormItemI) => {
			return formItem.attributionType === attributionType;
		});
	}

	public isAIUsageOptionYes(attibutionFormItems: FormItemI[]): boolean {
		const selectedOption: string = this.getAttributionFormItemByType(
			AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
			attibutionFormItems
		).selectedOptions[0];
		return selectedOption !== AIProportionOptions.ENTIRELY_HUMAN_CREATED;
	}

	public getConcatenatedOptionsAbbreviatedStatement(options: string[]): string {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return tag.abbreviation;
				} else {
					return '';
				}
			})
			.join('');
	}

	public getConcatenatedOptionsFullStatement(
		options: string[],
		includeFirstComma: boolean = true
	): string {
		return options
			.map((option: string, index: number) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					if (includeFirstComma || index !== 0) {
						return `, ${tag.name}`;
					} else {
						return `${tag.name}`;
					}
				} else {
					return '';
				}
			})
			.join('');
	}

	public getConcatenatedOptionsExplanations(options: string[]): string {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return `${tag.explanation}`;
				} else {
					return '';
				}
			})
			.join(' ');
	}

	public getConcatenatedOptionsIcons(options: string[]): Component[] {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return tag.iconComponent;
				} else {
					return null;
				}
			})
			.filter((component: Component) => component !== null);
	}

	public lowercaseFirstLetter(str: string): string {
		if (!str) return str;
		return str.charAt(0).toLowerCase() + str.slice(1);
	}

	public getOptionsSelectedPerField(attibutionFormItems: FormItemI[]): Record<string, string[]> {
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
	}

	public getFieldsFilledOut(attibutionFormItems: FormItemI[]): string[] {
		return attibutionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length > 0 &&
					item.selectedOptions.some((option: string) => option && option !== '')
			)
			.map((item: FormItemI) => item.text);
	}

	public getFieldsLeftBlank(attibutionFormItems: FormItemI[]): string[] {
		return attibutionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length === 0 ||
					item.selectedOptions.every((option: string) => !option || option === '')
			)
			.map((item: FormItemI) => item.text);
	}

	public getAttributionIcons(attibutionFormItems: FormItemI[]): Component[] {
		let icons: Component[] = [];
		const isAIUsageOptionYes = this.isAIUsageOptionYes(attibutionFormItems);

		const getIconsFromOptions = (type: AttributionType) => {
			return this.getAttributionFormItemByType(type, attibutionFormItems)
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
	}

	public getAttributionStatementExplanation(attibutionFormItems: FormItemI[]): string {
		let atributionStatementLabelContent: string = '';
		let proportionOfContribution: string = this.getConcatenatedOptionsExplanations(
			this.getAttributionFormItemByType(
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
		const isAIUsageOptionYes: boolean = this.isAIUsageOptionYes(attibutionFormItems);
		if (isAIUsageOptionYes) {
			aiContribution = this.getConcatenatedOptionsExplanations(
				this.getAttributionFormItemByType(AttributionType.AI_CONTRIBUTION, attibutionFormItems)
					.selectedOptions
			);
			aiInitiatives = this.getConcatenatedOptionsExplanations(
				this.getAttributionFormItemByType(AttributionType.AI_INITIATIVE, attibutionFormItems)
					.selectedOptions
			);
			if (!proportionOfContribution && !modelUsed && !aiContribution) {
				aiInitiatives = this.lowercaseFirstLetter(aiInitiatives);
			}
			humanReview = this.getConcatenatedOptionsExplanations(
				this.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attibutionFormItems)
					.selectedOptions
			);
			if (!proportionOfContribution && !modelUsed && !aiContribution && !aiInitiatives) {
				humanReview = this.lowercaseFirstLetter(humanReview);
			}
			if (
				this.getAttributionFormItemByType(AttributionType.MODEL, attibutionFormItems)
					.selectedOptions[0]
			) {
				const modelSelected: string = this.getAttributionFormItemByType(
					AttributionType.MODEL,
					attibutionFormItems
				).selectedOptions[0];
				if (proportionOfContribution || aiContribution || aiInitiatives || humanReview) {
					modelUsed = `${modelSelected} was used.`;
				} else {
					modelUsed = `this work involved the use of ${modelSelected}.`;
				}
			}
		}
		atributionStatementLabelContent = `This attribution statement indicates that ${proportionOfContribution} ${aiContribution} ${aiInitiatives} ${humanReview} ${modelUsed}`;
		atributionStatementLabelContent = atributionStatementLabelContent.replace('.,', ',');
		return atributionStatementLabelContent;
	}

	public downloadStatementSVG(statementHTMLContainer: HTMLDivElement, downloadName: string): void {
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
	}
}

export default new UtilsService();
