import { base } from '$app/paths';
import { ALL_TAGS } from '$lib/common/constants';
import { AttributionType, type FormItemI } from '$lib/components/attribution-statement/interfaces';
import { AIProportionOptions, type TagI } from '$lib/models/tag-library';

class UtilsService {
	constructor() {}

	public getAttributionFormItemByType(
		attributionType: AttributionType,
		attibutionFormItems: FormItemI[]
	): FormItemI {
		return attibutionFormItems.find((formItem: FormItemI) => {
			return formItem.attributionType === attributionType;
		});
	}

	public isAIUsageOptionYes(attibutionFormItems: FormItemI[]): boolean {
		return (
			this.getAttributionFormItemByType(
				AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
				attibutionFormItems
			).selectedOptions[0] !== AIProportionOptions.ENTIRELY_HUMAN_CREATED
		);
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

	public getConcatenatedOptionsIcons(options: string[]): string {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return `<img src="${base}${tag.icon}" alt="${tag.name}" width="24" height="24" />`;
				} else {
					return '';
				}
			})
			.join('');
	}
}

export default new UtilsService();
