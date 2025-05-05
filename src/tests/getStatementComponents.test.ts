import { ALL_TAGS } from '$lib/common/constants';
import { AIA, LAST_VERSION } from '$lib/components/create-attribution-statement/constants';
import { getStatementComponents } from '$lib/components/interpret-attribution/utils';
import { type TagI } from '$lib/models/tag-library';
import { describe, expect, it } from 'vitest';
import { TAGS_WITH_ATTRIBUTION_TYPE } from '../../cypress/support/constants';
import {
	generateCreateAttributeFormOptionsCombinations,
	getTagAbbreviation,
	getTagName,
	splitCombination
} from './utils';

describe('getStatementComponents', () => {
	const modelNameWithoutSpaces: string = 'granite-3-8b-instruct';
	const modelNameWithSpaces: string = 'granite 3 8b instruct';
	const version: string = LAST_VERSION;

	it('should recognize abbreviated statement of one component with AIA and version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentAbbreviation} ${version}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentAbbreviation], [AIA, version]]);
		});
	});

	it('should recognize abbreviated statement of one component with AIA', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentAbbreviation}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentAbbreviation], [AIA]]);
		});
	});

	it('should recognize abbreviated statement of one component with version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${statementComponentAbbreviation} ${version}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentAbbreviation], [version]]);
		});
	});

	it('should recognize abbreviated statement of one component', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentAbbreviation: string = getTagAbbreviation(tag.id);
			const statementToInterpret: string = `${statementComponentAbbreviation}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentAbbreviation], []]);
		});
	});

	it('should recognize full statement of one component with AIA and version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentName} ${version}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentName], [AIA, version]]);
		});
	});

	it('should recognize full statement of one component with AIA', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${AIA} ${statementComponentName}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentName], [AIA]]);
		});
	});

	it('should recognize full statement of one component with version', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${statementComponentName} ${version}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentName], [version]]);
		});
	});

	it('should recognize full statement of one component', () => {
		ALL_TAGS.forEach((tag: TagI) => {
			const statementComponentName: string = getTagName(tag.id);
			const statementToInterpret: string = `${statementComponentName}`;
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([[statementComponentName], []]);
		});
	});

	it('should recognize model name (without spaces) of one component with AIA and version', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithoutSpaces} ${version}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithoutSpaces], [AIA, version]]);
	});

	it('should recognize model name (without spaces) of one component with AIA', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithoutSpaces}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithoutSpaces], [AIA]]);
	});

	it('should recognize model name (without spaces) of one component with version', () => {
		const statementToInterpret: string = `${modelNameWithoutSpaces} ${version}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithoutSpaces], [version]]);
	});

	it('should recognize model name (without spaces) of one component', () => {
		const statementToInterpret: string = `${modelNameWithoutSpaces}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithoutSpaces], []]);
	});

	it('should recognize model name (with spaces) of one component with AIA and version', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithSpaces} ${version}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithSpaces], [AIA, version]]);
	});

	it('should recognize model name (with spaces) of one component with AIA', () => {
		const statementToInterpret: string = `${AIA} ${modelNameWithSpaces}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithSpaces], [AIA]]);
	});

	it('should recognize model name (with spaces) of one component with version', () => {
		const statementToInterpret: string = `${modelNameWithSpaces} ${version}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithSpaces], [version]]);
	});

	it('should recognize model name (with spaces) of one component', () => {
		const statementToInterpret: string = `${modelNameWithSpaces}`;
		expect(
			getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
		).toEqual([[modelNameWithSpaces], []]);
	});

	it('should recognize all possible combination of abbreviated components (model without spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA, version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA]]);
		});
	});

	it('should recognize all possible combination of abbreviated components (model without spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, []]);
		});
	});

	it('should recognize all possible combination of abbreviated components (model with spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA, version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA]]);
		});
	});

	it('should recognize all possible combination of abbreviated components (model with spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			true,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, []]);
		});
	});

	it('should recognize all possible combination of full components (model without spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA, version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA]]);
		});
	});

	it('should recognize all possible combination of full components (model without spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithoutSpaces
		);
		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, []]);
		});
	});

	it('should recognize all possible combination of full components (model with spaces) with AIA and version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${AIA} ${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA, version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [AIA]]);
		});
	});

	it('should recognize all possible combination of full components (model with spaces) with version', () => {
		const allCombinations: string[] = generateCreateAttributeFormOptionsCombinations(
			false,
			modelNameWithSpaces
		);

		allCombinations.forEach((combination: string) => {
			const statementToInterpret: string = `${combination} ${version}`;
			const combinations: string[] = splitCombination(combination);
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, [version]]);
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
			expect(
				getStatementComponents(statementToInterpret, ALL_TAGS, TAGS_WITH_ATTRIBUTION_TYPE)
			).toEqual([combinations, []]);
		});
	});
});
