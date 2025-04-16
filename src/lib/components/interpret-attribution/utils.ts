import {
    AIA,
    NO_AI_USED_ABBREVIATED_STATEMENT,
    NO_AI_USED_FULL_STATEMENT,
    VERSION
} from '../create-attribution-statement/constants';

export const getStatementComponents = (statementToInterpret: string): string[] => {
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
		if (firstElement === AIA && statementComponents.length !== 1) {
			statementComponents.shift();
		}
		const lastElement: string = statementComponents[statementComponents.length - 1];
		if (lastElement === VERSION) {
			statementComponents.pop();
		} else if (lastElement.includes(' ') && lastElement.endsWith(VERSION)) {
			const parts: string[] = lastElement.split(' ');
			statementComponents[statementComponents.length - 1] = parts.slice(0, -1).join(' ');
		}
	}

	for (let i = 0; i < statementComponents.length; i++) {
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
	}

	console.log(statementComponents);
	return statementComponents;
};
