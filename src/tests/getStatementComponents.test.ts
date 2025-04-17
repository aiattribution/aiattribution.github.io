import { ALL_TAGS } from '$lib/common/constants';
import { AIA, VERSION } from '$lib/components/create-attribution-statement/constants';
import { getStatementComponents } from '$lib/components/interpret-attribution/utils';
import { type TagI } from '$lib/models/tag-library';
import { describe, expect, it } from 'vitest';
import {
    generateCreateAttributeFormOptionsCombinations,
    getTagAbbreviation,
    getTagName,
    splitCombination
} from './utils';

describe('getStatementComponents', () => {
	const modelNameWithoutSpaces: string = 'granite-3-8b-instruct';
	const modelNameWithSpaces: string = 'granite 3 8b instruct';

	it('should recognize abbreviated statement of one component with AIA and version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentAbbreviation} ${VERSION}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([
				statementComponentAbbreviation
			]);
		});
	});

	it('should recognize abbreviated statement of one component with AIA', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentAbbreviation}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([
				statementComponentAbbreviation
			]);
		});
	});

	it('should recognize abbreviated statement of one component with version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${statementComponentAbbreviation} ${VERSION}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([
				statementComponentAbbreviation
			]);
		});
	});

	it('should recognize abbreviated statement of one component', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${statementComponentAbbreviation}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([
				statementComponentAbbreviation
			]);
		});
	});

	it('should recognize full statement of one component with AIA and version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentName} ${VERSION}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([statementComponentName]);
		});
	});

	it('should recognize full statement of one component with AIA', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentName}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([statementComponentName]);
		});
	});

	it('should recognize full statement of one component with version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${statementComponentName} ${VERSION}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([statementComponentName]);
		});
	});

	it('should recognize full statement of one component', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${statementComponentName}`;
			expect(getStatementComponents(statementToInterpret)).toEqual([statementComponentName]);
		});
	});

	it('should recognize model name (without spaces) of one component with AIA and version', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithoutSpaces} ${VERSION}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithoutSpaces]);
	});

	it('should recognize model name (without spaces) of one component with AIA', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithoutSpaces}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithoutSpaces]);
	});

	it('should recognize model name (without spaces) of one component with version', () => {
		const statementToInterpret: string = `${modelNameWithoutSpaces} ${VERSION}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithoutSpaces]);
	});

	it('should recognize model name (without spaces) of one component', () => {
		const statementToInterpret: string = `${modelNameWithoutSpaces}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithoutSpaces]);
	});

	it('should recognize model name (with spaces) of one component with AIA and version', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithSpaces} ${VERSION}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithSpaces]);
	});

	it('should recognize model name (with spaces) of one component with AIA', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithSpaces}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithSpaces]);
	});

	it('should recognize model name (with spaces) of one component with version', () => {
		const statementToInterpret: string = `${modelNameWithSpaces} ${VERSION}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithSpaces]);
	});

	it('should recognize model name (with spaces) of one component', () => {
		const statementToInterpret: string = `${modelNameWithSpaces}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelNameWithSpaces]);
	});

	it('should recognize all possible combination of abbreviated components (model without spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model without spaces) with AIA', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model without spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model without spaces)', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model with spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model with spaces) with AIA', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model with spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of abbreviated components (model with spaces)', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model without spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model without spaces) with AIA', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model without spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model without spaces)', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model with spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model with spaces) with AIA', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model with spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${VERSION}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});

	it('should recognize all possible combination of full components (model with spaces)', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination}`;
			const combinations: string[] = splitCombination(combination);
			expect(getStatementComponents(statementToInterpret)).toEqual(combinations);
		});
	});
});
