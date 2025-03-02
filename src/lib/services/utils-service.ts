import { ALL_TAGS } from '$lib/common/constants';
import { AttributionType, type FormItemI } from '$lib/components/attribution-statement/interfaces';
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
}

export default new UtilsService();
