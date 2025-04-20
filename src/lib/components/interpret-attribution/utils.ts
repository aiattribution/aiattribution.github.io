import { AIProportionOptions, type TagI } from '../..//models/tag-library';
import {
	AIA,
	NO_AI_USED_ABBREVIATED_STATEMENT,
	NO_AI_USED_FULL_STATEMENT,
	VERSION
} from '../create-attribution-statement/constants';

const getMaxTagNameWordLength = (allTags: TagI[]): number => {
	let maxTagNameWordLength: number = 0;
	for (const tag of allTags) {
		const wordCount: number = tag.name.trim().split(/\s+/).length;
		if (wordCount > maxTagNameWordLength) {
			maxTagNameWordLength = wordCount;
		}
	}
	return maxTagNameWordLength;
};

export const mergeTagsInStatement = (statementComponents: string[], allTags: TagI[]): string[] => {
	const maxWords: number = getMaxTagNameWordLength(allTags);

	for (let i: number = 0; i < statementComponents.length; i++) {
		// Case 1: "No", "AI"
		if (statementComponents[i] === 'No' && statementComponents[i + 1] === 'AI') {
			statementComponents.splice(i, 2, NO_AI_USED_ABBREVIATED_STATEMENT);
			break;
		}

		// Case 2: "AI", "not", "used"
		if (
			statementComponents[i] === 'AI' &&
			statementComponents[i + 1] === 'not' &&
			statementComponents[i + 2] === 'used'
		) {
			statementComponents.splice(i, 3, NO_AI_USED_FULL_STATEMENT);
			break;
		}

		for (let length: number = maxWords; length >= 2; length--) {
			const slice: string = statementComponents.slice(i, i + length).join(' ');

			const matchingTag: TagI = allTags.find((tag: TagI) => tag.name === slice);

			if (matchingTag) {
				statementComponents.splice(i, length, matchingTag.name);
				break;
			}
		}
	}

	let taggedStatementComponents: { statement: string; isValidTag: boolean }[] = [];

	for (let i: number = 0; i < statementComponents.length; i++) {
		const statementComponent: string = statementComponents[i];
		if (
			allTags.find(
				(tag: TagI) =>
					tag.abbreviation === statementComponent ||
					tag.name === statementComponent ||
					(tag.id === AIProportionOptions.ENTIRELY_HUMAN_CREATED &&
						(statementComponent === NO_AI_USED_ABBREVIATED_STATEMENT ||
							statementComponent === NO_AI_USED_FULL_STATEMENT))
			)
		) {
			taggedStatementComponents.push({ statement: statementComponent, isValidTag: true });
		} else {
			taggedStatementComponents.push({ statement: statementComponent, isValidTag: false });
		}
	}

	let groupedStatementComponents: string[] = [];
	let currentGroup: string = '';

	for (let i: number = 0; i < taggedStatementComponents.length; i++) {
		const item = taggedStatementComponents[i];

		if (item.isValidTag === false) {
			if (currentGroup) {
				currentGroup += ' ' + item.statement;
			} else {
				currentGroup = item.statement;
			}
		} else {
			if (currentGroup) {
				groupedStatementComponents.push(currentGroup);
				currentGroup = '';
			}
			groupedStatementComponents.push(item.statement);
		}
	}

	if (currentGroup) {
		groupedStatementComponents.push(currentGroup);
	}

	return groupedStatementComponents;
};

export const getStatementComponents = (statementToInterpret: string, allTags: TagI[]): string[] => {
	let statementComponents: string[] = [];
	if (statementToInterpret.includes(',')) {
		statementComponents = statementToInterpret.split(',').map((item: string) => item.trim());
		if (statementComponents.length > 0 && statementComponents[0].includes(' ')) {
			const firstElement: string = statementComponents[0];
			const [part1, ...rest] = firstElement.split(' ');
			statementComponents[0] = part1;
			statementComponents.splice(1, 0, rest.join(' '));
		}
	} else {
		statementComponents = statementToInterpret.trim().split(/\s+/);
	}
	if (statementComponents.length > 0) {
		const firstElement: string = statementComponents[0];
		const lastElement: string = statementComponents[statementComponents.length - 1];
		if (
			firstElement === AIA &&
			statementComponents.length !== 1 &&
			!(statementComponents.length === 2 && lastElement === VERSION)
		) {
			statementComponents.shift();
		}
		if (lastElement === VERSION) {
			statementComponents.pop();
		} else if (lastElement.includes(' ') && lastElement.endsWith(VERSION)) {
			const parts: string[] = lastElement.split(' ');
			statementComponents[statementComponents.length - 1] = parts.slice(0, -1).join(' ');
		}
	}

	statementComponents = mergeTagsInStatement(statementComponents, allTags);

	return statementComponents;
};
