import { ALL_TAGS } from '$lib/common/constants';
import { AIA, VERSION } from '$lib/components/create-attribution-statement/constants';
import { getStatementComponents } from '$lib/components/interpret-attribution/utils';
import { type TagI } from '$lib/models/tag-library';
import { describe, expect, it } from 'vitest';
import { getTagAbbreviation, getTagName } from './utils';

describe('getStatementComponents', () => {
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

	it('should recognize model name of one component with AIA and version', () => {
		const modelName: string = 'granite-3-8b-instruct';
		const statementToInterpret: string = `${AIA} ${modelName} ${VERSION}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelName]);
	});

	it('should recognize model name of one component with AIA', () => {
		const modelName: string = 'granite-3-8b-instruct';
		const statementToInterpret: string = `${AIA} ${modelName}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelName]);
	});

	it('should recognize model name of one component with version', () => {
		const modelName: string = 'granite-3-8b-instruct';
		const statementToInterpret: string = `${modelName} ${VERSION}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelName]);
	});

	it('should recognize model name of one component', () => {
		const modelName: string = 'granite-3-8b-instruct';
		const statementToInterpret: string = `${modelName}`;
		expect(getStatementComponents(statementToInterpret)).toEqual([modelName]);
	});
});
