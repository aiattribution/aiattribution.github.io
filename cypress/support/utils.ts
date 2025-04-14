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

export const getAbbreviatedStatement = (tagId: string): string => {
	let tagAbbreviation: string = getTagAbbreviation(tagId);
	return `${AIA} ${tagAbbreviation} ${VERSION}`;
};

export const getFullStatement = (tagId: string): string => {
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
	return `${AIA} ${tagName} ${VERSION}`;
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

export const getExpandedStatement = (tagId: string): string => {
	let tagExplanation: string = getTagExplanation(tagId);
	tagExplanation = tagExplanation.replace('The work', 'this work');
	tagExplanation = tagExplanation.replace('This work', 'this work');
	return `${EXPANDED_STATEMENT_INITIAL_TEXT} ${tagExplanation}`;
};

export const getTagDescription = (tagId: string): string => {
	return `${getTagAbbreviation(tagId)}: ${getTagExplanation(tagId)}`;
};
