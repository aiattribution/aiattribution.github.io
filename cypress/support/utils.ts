import {
	AIA,
	EXPANDED_STATEMENT_INITIAL_TEXT,
	NO_AI_USED_ABBREVIATED_STATEMENT,
	NO_AI_USED_FULL_STATEMENT,
	VERSION
} from '../../src/lib/components/create-attribution-statement/constants.ts';
import { AIProportionOptions, TagI } from '../../src/lib/models/tag-library.ts';
import { ALL_TAGS } from '../support/constants.ts';

const allTags: TagI[] = ALL_TAGS;

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

export const getAbbreviatedStatement = (tagIds: string[]): string => {
	const abbreviations: string[] = tagIds
		.map((tagId: string) => getTagAbbreviation(tagId))
		.filter((abbreviation: string) => abbreviation.trim() !== '');
	return `${AIA} ${abbreviations.join(' ')} ${VERSION}`;
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

export const getFullStatement = (tagIds: string[]): string => {
	const tagNames: string[] = tagIds
		.map((tagId: string) => getTagName(tagId))
		.filter((name: string) => name.trim() !== '');
	return `${AIA} ${tagNames.join(', ')} ${VERSION}`;
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

export const getExpandedStatement = (tagIds: string[]): string => {
	const explanations: string[] = tagIds
		.map((tagId: string) => {
			let tagExplanation: string = getTagExplanation(tagId);
			tagExplanation = tagExplanation.replace('The work', 'this work');
			tagExplanation = tagExplanation.replace('This work', 'this work');
			return tagExplanation;
		})
		.filter((explanation: string) => explanation.trim() !== '');
	return `${EXPANDED_STATEMENT_INITIAL_TEXT} ${explanations.join(' ')}`;
};

export const getTagDescription = (tagId: string): string => {
	return `${getTagAbbreviation(tagId)}: ${getTagExplanation(tagId)}`;
};
