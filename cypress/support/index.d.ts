/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		viewportMacbook16(): Chainable<void>;
		viewportTablet(): Chainable<void>;
		viewportMobile(): Chainable<void>;
		visitAppHome(): Chainable<void>;
		clickHamburgerMenuButton(): Chainable<void>;
		shouldHaveDisabledClass(elementSelector: string, index: number): Chainable<void>;
		shouldNotHaveDisabledClass(elementSelector: string, index: number): Chainable<void>;
		shouldHaveEmptyCreateStatementFormState(): Chainable<void>;
		shouldHaveCorrectNumberOfRecommendedAttributionItems(): Chainable<void>;
		shouldHaveExpectedTextInRecommendedAttributionItem(
			recommendedAttributionItemNumber: number,
			expectedText: string
		): Chainable<void>;
		shouldHaveExpectedTextsInRecommendedAttributionItems(tagId: string): Chainable<void>;
		shouldNotHaveEmptyCreateStatementFormState(tagId: string): Chainable<void>;
		shouldHaveExpectedAttributionStatementExplanation(
			numberAttributionIconItemContainerExpected: number,
			statementExplanation: string
		): Chainable<void>;
	}
}
