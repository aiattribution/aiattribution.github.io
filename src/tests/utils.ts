import { ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE } from '../../cypress/support/constants';
import {
	AIA,
	ATTRIBUTION_FORM_ITEMS,
	EXPANDED_STATEMENT_INITIAL_TEXT,
	NO_AI_USED_ABBREVIATED_STATEMENT,
	NO_AI_USED_FULL_STATEMENT,
	VERSION
} from '../lib/components/create-attribution-statement/constants';
import {
	AttributionType,
	FormItemType,
	type FormItemI,
	type StatementOption
} from '../lib/components/create-attribution-statement/interfaces';
import { mergeTagsInStatement } from '../lib/components/interpret-attribution/utils';
import { AIProportionOptions, type TagI } from '../lib/models/tag-library';

const allTags: TagI[] = ALL_TAGS;

export const lowercaseFirstLetter = (str: string): string => {
	if (!str || str.startsWith('AI')) return str;
	return str.charAt(0).toLowerCase() + str.slice(1);
};

export const getGroupedTags = (tagIds: string[]): Record<string, string[]> => {
	const groupedTags: Record<string, string[]> = {};

	for (const tagId of tagIds) {
		for (const group of TAGS_WITH_ATTRIBUTION_TYPE) {
			if (group.tags.some((tag: TagI) => tag.id === tagId)) {
				if (!groupedTags[group.attributionType]) {
					groupedTags[group.attributionType] = [];
				}
				groupedTags[group.attributionType].push(tagId);
				break;
			}
		}
	}

	for (const { attributionType, tags } of TAGS_WITH_ATTRIBUTION_TYPE) {
		if (groupedTags[attributionType]) {
			const orderedIds: string[] = tags
				.map((tag: TagI) => tag.id)
				.filter((id: string) => groupedTags[attributionType].includes(id));
			groupedTags[attributionType] = orderedIds;
		}
	}

	return groupedTags;
};

export const getTagAbbreviation = (tagId: string): string => {
	let tagAbbreviation: string = '';
	for (let index: number = 0; index < allTags.length; index++) {
		const tag: TagI = allTags[index];
		if (tagId === tag.id && tagId === AIProportionOptions.ENTIRELY_HUMAN_CREATED) {
			tagAbbreviation = NO_AI_USED_ABBREVIATED_STATEMENT;
			break;
		} else if (tagId === tag.id) {
			tagAbbreviation = tag.abbreviation;
			break;
		}
	}
	return tagAbbreviation;
};

export const getAbbreviatedStatement = (tagIds: string[], modelName?: string): string => {
	const groupedTags: Record<string, string[]> = getGroupedTags(tagIds);
	const groupedAbbreviations: string[] = [];

	for (const { attributionType } of TAGS_WITH_ATTRIBUTION_TYPE) {
		const ids: string[] = groupedTags[attributionType];
		if (ids && ids.length) {
			const abbreviation: string = ids
				.map((id: string) => getTagAbbreviation(id))
				.filter((abbreviation: string) => abbreviation.trim() !== '')
				.join('');
			if (abbreviation) {
				groupedAbbreviations.push(abbreviation);
			}
		}
	}

	if (modelName) {
		groupedAbbreviations.push(modelName);
	}

	return `${AIA} ${groupedAbbreviations.join(' ')} ${VERSION}`;
};

export const getTagName = (tagId: string): string => {
	let tagName: string = '';
	for (let index: number = 0; index < allTags.length; index++) {
		const tag: TagI = allTags[index];
		if (tagId === tag.id && tagId === AIProportionOptions.ENTIRELY_HUMAN_CREATED) {
			tagName = NO_AI_USED_FULL_STATEMENT;
			break;
		} else if (tagId === tag.id) {
			tagName = tag.name;
			break;
		}
	}
	return tagName;
};

export const getFullStatement = (tagIds: string[], modelName?: string): string => {
	const groupedTags: Record<string, string[]> = getGroupedTags(tagIds);
	const groupedNames: string[] = [];

	for (const { attributionType } of TAGS_WITH_ATTRIBUTION_TYPE) {
		const ids: string[] = groupedTags[attributionType];
		if (ids && ids.length) {
			const name: string = ids
				.map((id: string) => getTagName(id))
				.filter((name: string) => name.trim() !== '')
				.join(', ');
			if (name) {
				groupedNames.push(name);
			}
		}
	}

	if (modelName) {
		groupedNames.push(modelName);
	}

	return `${AIA} ${groupedNames.join(', ')} ${VERSION}`;
};

export const getTagExplanation = (tagId: string): string => {
	let tagExplanation: string = '';
	for (let index: number = 0; index < allTags.length; index++) {
		const tag: TagI = allTags[index];
		if (tagId === tag.id) {
			tagExplanation = tag.explanation;
			break;
		}
	}
	return tagExplanation;
};

export const getExpandedStatement = (tagIds: string[], modelName?: string): string => {
	const groupedTags: Record<string, string[]> = getGroupedTags(tagIds);
	const groupedExplanations: string[] = [];

	for (const { attributionType } of TAGS_WITH_ATTRIBUTION_TYPE) {
		const ids: string[] = groupedTags[attributionType];
		if (ids && ids.length) {
			const explanation: string = ids
				.map((id: string) => {
					let tagExplanation: string = getTagExplanation(id);
					tagExplanation = tagExplanation.replace('The work', 'this work');
					tagExplanation = tagExplanation.replace('This work', 'this work');
					return tagExplanation;
				})
				.filter((explanation: string) => explanation.trim() !== '')
				.join(' ');
			if (explanation) {
				groupedExplanations.push(explanation);
			}
		}
	}

	if (modelName) {
		let modelUsed: string = '';
		if (groupedExplanations.length > 0) {
			modelUsed = `The ${modelName} model or application was used.`;
		} else {
			modelUsed = `this work involved the use of the ${modelName} model or application.`;
		}
		groupedExplanations.push(modelUsed);
	}

	if (groupedExplanations.length === 1 && !modelName) {
		groupedExplanations[0] = lowercaseFirstLetter(groupedExplanations[0]);
	}

	return `${EXPANDED_STATEMENT_INITIAL_TEXT} ${groupedExplanations.join(' ')}`;
};

export const getTagDescriptions = (tagIds: string[]): string[] => {
	const groupedTags: Record<string, string[]> = getGroupedTags(tagIds);
	const groupedDescriptions: string[] = [];

	for (const { attributionType } of TAGS_WITH_ATTRIBUTION_TYPE) {
		const ids: string[] = groupedTags[attributionType];
		if (ids && ids.length) {
			const abbreviations: string[] = [];
			const explanations: string[] = [];

			for (const id of ids) {
				const abbreviation: string = getTagAbbreviation(id);
				const explanation: string = getTagExplanation(id);

				if (abbreviation) {
					abbreviations.push(abbreviation);
				}
				if (explanation) {
					explanations.push(explanation);
				}
			}

			if (abbreviations.length && explanations.length) {
				groupedDescriptions.push(`${abbreviations.join('')}: ${explanations.join(' ')}`);
			}
		}
	}

	return groupedDescriptions;
};

const getCreateAttributeFormOptionsCombinations = (arr: string[]): string[] => {
	let result: string[] = [''];
	const f = (prefix: string, arr: string[]) => {
		for (let i: number = 0; i < arr.length; i++) {
			const current: string = (prefix + arr[i]).trim();
			result.push(current);
			f((current + ' ').trim() + ' ', arr.slice(i + 1));
		}
	};
	f('', arr);
	return result.filter((str: string) => str.length > 0);
};

const cartesianProduct = (arrays: string[][]): string[] => {
	if (arrays.length === 0) return [];

	return arrays.reduce((acc: string[], curr: string[]) => {
		let result: string[] = [];
		for (const a of acc) {
			for (const c of curr) {
				if (a && c) {
					result.push(`${a} ${c}`.trim());
				} else {
					result.push((a + c).trim());
				}
			}
		}
		return result;
	});
};

export const generateCreateAttributeFormOptionsCombinations = (
	isAbbreviated: boolean,
	modelName: string
): string[] => {
	let attributionFormItems: FormItemI[] = ATTRIBUTION_FORM_ITEMS;

	const modelIndex: number = attributionFormItems.findIndex(
		(value: FormItemI) => value.attributionType === AttributionType.MODEL
	);
	if (modelIndex >= 0) {
		attributionFormItems[modelIndex].options[0] = {
			option: modelName
		};
	}

	const itemCombinations: string[][] = [];

	for (const item of attributionFormItems) {
		let options: string[] = item.options.map((statementOption: StatementOption) => {
			if (item.attributionType === AttributionType.MODEL) {
				return statementOption.option;
			} else {
				const tag: TagI | undefined = ALL_TAGS.find(
					(tag: TagI) => tag.id === statementOption.option
				);
				if (tag) {
					return isAbbreviated ? tag.abbreviation : tag.name;
				} else {
					return statementOption.option;
				}
			}
		});

		if (
			item.typeOfItem === FormItemType.radioButton ||
			item.typeOfItem === FormItemType.textInput
		) {
			itemCombinations.push(['', ...options]);
		} else if (item.typeOfItem === FormItemType.checkbox) {
			const combinations: string[] = getCreateAttributeFormOptionsCombinations(options);
			itemCombinations.push(['', ...combinations]);
		}
	}

	const allCombinations: string[] = cartesianProduct(itemCombinations)
		.map((c: string) => c.trim())
		.filter((c: string) => c.length > 0);

	return allCombinations;
};

export const splitCombination = (combination: string): string[] => {
	let combinations: string[] = combination.split(/\s+/);
	combinations = mergeTagsInStatement(combinations, allTags);
	return combinations;
};
