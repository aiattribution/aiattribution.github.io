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
		attributionFormItems: FormItemI[]
	): FormItemI {
		return attributionFormItems.find((formItem: FormItemI) => {
			return formItem.attributionType === attributionType;
		});
	}

	public getAttributionFormItemIndexByType(
		attributionType: AttributionType,
		attributionFormItems: FormItemI[]
	): number {
		return attributionFormItems.findIndex((formItem: FormItemI) => {
			return formItem.attributionType === attributionType;
		});
	}

	public isAIUsageOptionYes(attributionFormItems: FormItemI[]): boolean {
		const selectedOption: string = this.getAttributionFormItemByType(
			AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
			attributionFormItems
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

	public getOptionsSelectedPerField(attributionFormItems: FormItemI[]): Record<string, string[]> {
		return attributionFormItems
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

	public getFieldsFilledOut(attributionFormItems: FormItemI[]): string[] {
		return attributionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length > 0 &&
					item.selectedOptions.some((option: string) => option && option !== '')
			)
			.map((item: FormItemI) => item.text);
	}

	public getFieldsLeftBlank(attributionFormItems: FormItemI[]): string[] {
		return attributionFormItems
			.filter(
				(item: FormItemI) =>
					item.selectedOptions.length === 0 ||
					item.selectedOptions.every((option: string) => !option || option === '')
			)
			.map((item: FormItemI) => item.text);
	}

	public getAttributionIcons(attributionFormItems: FormItemI[]): Component[] {
		let icons: Component[] = [];
		const isAIUsageOptionYes: boolean = this.isAIUsageOptionYes(attributionFormItems);

		const getIconsFromOptions = (type: AttributionType): Component[] => {
			return this.getAttributionFormItemByType(type, attributionFormItems)
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

	public getAttributionStatementExplanation(attributionFormItems: FormItemI[]): string {
		let atributionStatementLabelContent: string = '';
		let proportionOfContribution: string = this.getConcatenatedOptionsExplanations(
			this.getAttributionFormItemByType(
				AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
				attributionFormItems
			).selectedOptions
		);
		proportionOfContribution = proportionOfContribution.replace('The work', 'This work');
		let aiContribution: string = '';
		let aiInitiatives: string = '';
		let humanReview: string = '';
		let modelUsed: string = '';
		const isAIUsageOptionYes: boolean = this.isAIUsageOptionYes(attributionFormItems);
		if (isAIUsageOptionYes) {
			aiContribution = this.getConcatenatedOptionsExplanations(
				this.getAttributionFormItemByType(AttributionType.AI_CONTRIBUTION, attributionFormItems)
					.selectedOptions
			);
			aiInitiatives = this.getConcatenatedOptionsExplanations(
				this.getAttributionFormItemByType(AttributionType.AI_INITIATIVE, attributionFormItems)
					.selectedOptions
			);
			humanReview = this.getConcatenatedOptionsExplanations(
				this.getAttributionFormItemByType(AttributionType.HUMAN_REVIEW, attributionFormItems)
					.selectedOptions
			);
			if (
				this.getAttributionFormItemByType(AttributionType.MODEL, attributionFormItems)
					.selectedOptions[0]
			) {
				const modelSelected: string = this.getAttributionFormItemByType(
					AttributionType.MODEL,
					attributionFormItems
				).selectedOptions[0];
				if (proportionOfContribution || aiContribution || aiInitiatives || humanReview) {
					modelUsed = `The following model(s) or application(s) were used: ${modelSelected}.`;
				} else {
					modelUsed = `This work involved the use of the following model(s) or application(s): ${modelSelected}.`;
				}
			}
		}
		atributionStatementLabelContent = `${proportionOfContribution} ${aiContribution} ${aiInitiatives} ${humanReview} ${modelUsed}`;
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

		const textContent: string = textElement?.textContent?.trim().replace(/\s+/g, ' ') || '';
		const iconsHTML: string = this.getCleanedHTML(iconsContainer) || '';

		const getTextWidth = (
			text: string,
			fontWeight: string,
			fontSize: string,
			fontFamily: string
		): number => {
			const svg: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			svg.style.visibility = 'hidden';
			svg.style.position = 'absolute';
			svg.style.top = '-9999px';

			const textElem: SVGTextElement = document.createElementNS(
				'http://www.w3.org/2000/svg',
				'text'
			);
			textElem.textContent = text;
			textElem.setAttribute('font-weight', fontWeight);
			textElem.setAttribute('font-size', fontSize);
			textElem.setAttribute('font-family', fontFamily);
			textElem.setAttribute('letter-spacing', '0');
			svg.appendChild(textElem);

			document.body.appendChild(svg);
			const width: number = textElem.getBBox().width;
			document.body.removeChild(svg);

			return width;
		};

		const fontStyle: CSSStyleDeclaration = window.getComputedStyle(textElement || document.body);

		const textWidth: number = getTextWidth(
			textContent,
			fontStyle.fontWeight,
			fontStyle.fontSize,
			fontStyle.fontFamily
		);
		const iconsWidth: number = iconsContainer?.getBoundingClientRect().width || 0;
		// 8: left padding, right padding, gap between text and icons
		const svgWidth: number = textWidth + iconsWidth + 8 * 3;

		const parser: DOMParser = new DOMParser();
		const iconsDoc: Document = parser.parseFromString(`<div>${iconsHTML}</div>`, 'text/html');
		const svgIcons: Element[] = Array.from(
			(iconsDoc.body.firstChild as HTMLElement)?.children || []
		);
		const svgIconsString: string = svgIcons
			.map((icon: Element, index: number) => {
				const width: number = icon.getBoundingClientRect?.().width || 16;
				const transformedSVG = `
					<g transform="translate(${textWidth + 16 + width * index + 16 * index}, 8)">
						${icon.outerHTML}
					</g>
				`;
				return transformedSVG;
			})
			.join('');

		const svgContent: string = `
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="40px">
	<text x="8" y="25" font-family="'IBM Plex Sans', sans-serif" font-size="16" font-weight="400" letter-spacing="0" fill="#000">
		${textContent}
    </text>
	${svgIconsString}
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

	private getClassInlineStyle(className: string): string {
		const inlineStyle = {
			'.recommended-attribution-item-text-container': `
                display: flex;
				align-items: center;
				white-space: nowrap;
				gap: 0.5rem;
				padding: 8px;
            `,
			'.recommended-attribution-item-text': `
				font-family: IBM Plex Sans;
				font-weight: 400;
				font-size: 16px;
				line-height: 22px;
				letter-spacing: 0px;
			`,
			'.recommended-attribution-item-icons-container': `
				display: flex;
				gap: 0.5rem;
			`
		};
		return inlineStyle[className];
	}

	private getCleanedHTML(HTMLElement: Element): string {
		if (HTMLElement) {
			const clone: HTMLElement = HTMLElement.cloneNode(true) as HTMLElement;

			const cleanElement = (element: Element) => {
				if (element.classList) {
					[...element.classList].forEach((cls: string) => {
						if (/^s-[a-zA-Z0-9]+$/.test(cls)) {
							element.classList.remove(cls);
						}
					});
				}
				for (let i: number = element.childNodes.length - 1; i >= 0; i--) {
					const node: ChildNode = element.childNodes[i];
					if (node.nodeType === Node.COMMENT_NODE) {
						element.removeChild(node);
					} else if (node.nodeType === Node.ELEMENT_NODE) {
						cleanElement(node as HTMLElement);
					}
				}
			};

			cleanElement(clone);

			return (clone as Element).innerHTML;
		}
		return '';
	}

	public getStatementHTMLText(HTMLElement: Element): string {
		let statementHTMLText: string = this.getCleanedHTML(HTMLElement);
		const div: HTMLDivElement = document.createElement('div');
		const divTextContainer: HTMLDivElement = document.createElement('div');
		divTextContainer.classList.add('recommended-attribution-item-text-container');
		divTextContainer.innerHTML = statementHTMLText;
		const replaceClassesWithStyles = (element: Element) => {
			if (element.classList) {
				[...element.classList].forEach((cls: string) => {
					const style: string = this.getClassInlineStyle(`.${cls}`);
					if (style) {
						element.setAttribute('style', style);
					}
					element.classList.remove(cls);
				});
				element.removeAttribute('class');
			}
			for (let i: number = element.childNodes.length - 1; i >= 0; i--) {
				const node: ChildNode = element.childNodes[i];
				replaceClassesWithStyles(node as HTMLElement);
			}
		};
		replaceClassesWithStyles(divTextContainer);
		div.appendChild(divTextContainer);
		return div.innerHTML;
	}
}

export default new UtilsService();
