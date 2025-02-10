import { base } from '$app/paths';
import { ALL_TAGS } from '$lib/common/constants';
import { AttributionType, type FormItemI } from '$lib/components/attribution-statement/interfaces';
import { AIUsageOptions, type TagI } from '$lib/models/tag-library';

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
			this.getAttributionFormItemByType(AttributionType.AI_USED, attibutionFormItems)
				.selectedOptions[0] === AIUsageOptions.YES
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

	public getConcatenatedOptionsFullStatement(options: string[]): string {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return `, ${tag.name}`;
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
					return `<img src="${base}${tag.icon}" alt="${tag.selection}" width="24" height="24" />`;
				} else {
					return '';
				}
			})
			.join('');
	}
}

export default new UtilsService();
