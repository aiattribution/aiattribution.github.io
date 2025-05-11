import {
	AIProportionOptions,
	type TagI,
	type TagsWithAttributionType
} from '../..//models/tag-library';
import {
	AIA,
	ATTRIBUTION_FORM_ITEMS,
	NO_AI_USED,
	VERSIONS
} from '../create-attribution-statement/constants';
import {
	AttributionType,
	FormItemType,
	type FormItemI
} from '../create-attribution-statement/interfaces';

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

const getAllStringCombinations = (array: string[]): string[] => {
	const result: Set<string> = new Set();

	const permute = (prefix: string, remaining: string[]) => {
		if (prefix.length > 0) {
			result.add(prefix);
		}
		for (let i = 0; i < remaining.length; i++) {
			const next: string[] = [...remaining];
			const char: string[] = next.splice(i, 1);
			permute(prefix + char[0], next);
		}
	};

	permute('', array);
	return Array.from(result);
};

export const mergeTagsInStatement = (
	statementComponents: string[],
	allTags: TagI[],
	tagsWithAttributionType: TagsWithAttributionType[]
): string[] => {
	const maxWords: number = getMaxTagNameWordLength(allTags);

	for (let i: number = 0; i < statementComponents.length; i++) {
		if (statementComponents[i] === 'No' && statementComponents[i + 1] === 'AI') {
			statementComponents.splice(i, 2, NO_AI_USED);
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

	let possibleTagsCombinations: string[] = [];
	ATTRIBUTION_FORM_ITEMS.forEach((attributionFormItem: FormItemI) => {
		if (attributionFormItem.attributionType !== AttributionType.MODEL) {
			const tags: TagI[] =
				tagsWithAttributionType.find(
					(value) => value.attributionType === attributionFormItem.attributionType
				)?.tags || [];
			if (attributionFormItem.typeOfItem === FormItemType.checkbox) {
				possibleTagsCombinations.push(
					...getAllStringCombinations(tags.map((tag) => tag.abbreviation))
				);
			} else {
				possibleTagsCombinations.push(...tags.map((tag) => tag.abbreviation));
			}
		}
	});

	for (let i: number = 0; i < statementComponents.length; i++) {
		const statementComponent: string = statementComponents[i];

		if (
			possibleTagsCombinations.find((tagId: string) => tagId === statementComponent) ||
			allTags.find(
				(tag: TagI) =>
					tag.abbreviation === statementComponent ||
					tag.name === statementComponent ||
					(tag.id === AIProportionOptions.ENTIRELY_HUMAN_CREATED &&
						statementComponent === NO_AI_USED)
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

export const getStatementComponents = (
	statementToInterpret: string,
	allTags: TagI[],
	tagsWithAttributionType: TagsWithAttributionType[]
): [string[], string[]] => {
	let statementComponents: string[] = [];
	let fixedComponents: string[] = [];
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
		const lastElementIsAVersion: boolean = VERSIONS.includes(lastElement);
		if (
			firstElement === AIA &&
			statementComponents.length !== 1 &&
			!(statementComponents.length === 2 && lastElementIsAVersion)
		) {
			fixedComponents.push(statementComponents.shift());
		}
		const versionMatch: string = VERSIONS.find((v: string) => lastElement.endsWith(v));
		if (lastElementIsAVersion) {
			fixedComponents.push(statementComponents.pop());
		} else if (lastElement.includes(' ') && versionMatch) {
			const parts: string[] = lastElement.split(' ');
			statementComponents[statementComponents.length - 1] = parts.slice(0, -1).join(' ');
			fixedComponents.push(versionMatch);
		}
	}

	statementComponents = mergeTagsInStatement(statementComponents, allTags, tagsWithAttributionType);

	return [statementComponents, fixedComponents];
};
