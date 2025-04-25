/// <reference types="cypress" />

import {
	AIA_EXPLANATION,
	getVersionExplanation
} from '../../src/lib/components/create-attribution-statement/constants';
import {
	getAbbreviatedStatement,
	getExpandedStatement,
	getFullStatement
} from '../../src/tests/utils';
import { HEADER_HAMBURGER_MENU_BUTTON_CLASS } from './constants';

Cypress.Commands.add('viewportMacbook16', () => {
	cy.viewport(1728, 1117);
});

Cypress.Commands.add('viewportTablet', () => {
	cy.viewport(1024, 768);
});

Cypress.Commands.add('viewportMobile', () => {
	cy.viewport(430, 932);
});

Cypress.Commands.add('visitAppHome', () => {
	cy.visit('https://localhost:5173/');
});

Cypress.Commands.add('clickHamburgerMenuButton', () => {
	cy.get(HEADER_HAMBURGER_MENU_BUTTON_CLASS).click();
});

Cypress.Commands.add('verifyLink', (text: string, link: string) => {
	cy.contains('a.bx--link', text)
		.should('have.attr', 'href', link)
		.and('have.attr', 'target', '_blank');
});

Cypress.Commands.add('verifyElementCount', (selector: string, expectedCount: number) => {
	cy.get(selector).should('have.length', expectedCount);
});

const disabledClass: string = 'disabled';
Cypress.Commands.add('shouldHaveDisabledClass', (elementSelector: string, index: number) => {
	cy.get(elementSelector).eq(index).should('have.class', disabledClass);
});

Cypress.Commands.add('shouldNotHaveDisabledClass', (elementSelector: string, index: number) => {
	cy.get(elementSelector).eq(index).should('not.have.class', disabledClass);
});

const emptyStateTextClass: string = '.empty-state-text';
Cypress.Commands.add('shouldHaveEmptyCreateStatementFormState', () => {
	cy.get(emptyStateTextClass).should('exist');
});

const recommendedAttributionContainerClass: string = '.recommended-attribution-container';
const recommendedAttributionItemContainerClass: string = '.recommended-attribution-item-container';
Cypress.Commands.add('shouldHaveCorrectNumberOfRecommendedAttributionItems', () => {
	cy.get(recommendedAttributionContainerClass)
		.find(recommendedAttributionItemContainerClass)
		.should('have.length', 3);
});

const recommendedAttributionItemTextClass: string = '.recommended-attribution-item-text';
Cypress.Commands.add(
	'shouldHaveExpectedTextInRecommendedAttributionItem',
	(recommendedAttributionItemNumber: number, expectedText: string) => {
		cy.get(recommendedAttributionItemTextClass)
			.eq(recommendedAttributionItemNumber)
			.invoke('text')
			.then((text: string) => {
				const cleaned: string = text.trim().replace(/\s+/g, ' ');
				expect(cleaned).to.eq(expectedText);
			});
	}
);

Cypress.Commands.add(
	'shouldHaveExpectedTextsInRecommendedAttributionItems',
	(tagIds: string[], modelName?: string) => {
		cy.shouldHaveExpectedTextInRecommendedAttributionItem(
			0,
			getAbbreviatedStatement(tagIds, modelName)
		);
		cy.shouldHaveExpectedTextInRecommendedAttributionItem(1, getFullStatement(tagIds, modelName));
		cy.shouldHaveExpectedTextInRecommendedAttributionItem(
			2,
			getExpandedStatement(tagIds, modelName)
		);
	}
);

Cypress.Commands.add(
	'shouldNotHaveEmptyCreateStatementFormState',
	(tagIds: string[], modelName?: string) => {
		cy.get(emptyStateTextClass).should('not.exist');
		cy.shouldHaveCorrectNumberOfRecommendedAttributionItems();
		cy.shouldHaveExpectedTextsInRecommendedAttributionItems(tagIds, modelName);
	}
);

const explanationTitleClass: string = '.explanation-title';
const attributionStatementExplanationTextClass: string = '.attribution-statement-explanation-text';
const attributionIconsDescriptionsClass: string = '.attribution-icons-descriptions';
const attributionIconItemContainerClass: string = '.attribution-icon-item-container';
const attributionStatementIconDescriptionClass: string = '.attribution-statement-icon-description';
Cypress.Commands.add(
	'shouldHaveExpectedAttributionStatementExplanation',
	(
		numberAttributionIconItemContainerExpected: number,
		statementExplanations: string[],
		version: string
	) => {
		cy.get(explanationTitleClass).should('have.text', 'Explanation');
		cy.get(attributionStatementExplanationTextClass).eq(0).should('have.text', AIA_EXPLANATION);
		cy.get(attributionStatementExplanationTextClass)
			.eq(1)
			.should('have.text', getVersionExplanation(version));

		cy.verifyElementCount(
			`${attributionIconsDescriptionsClass} ${attributionIconItemContainerClass}`,
			numberAttributionIconItemContainerExpected
		);

		if (statementExplanations.length > 0) {
			cy.get(
				`${attributionIconsDescriptionsClass} ${attributionStatementIconDescriptionClass}`
			).each(($el: JQuery<HTMLElement>, index: number) => {
				cy.wrap($el)
					.invoke('text')
					.then((text: string) => {
						const cleaned: string = text.trim().replace(/\s+/g, ' ');
						expect(cleaned).to.eq(statementExplanations[index]);
					});
			});
		} else {
			cy.get(`${attributionIconsDescriptionsClass}`).should('not.exist');
		}
	}
);
