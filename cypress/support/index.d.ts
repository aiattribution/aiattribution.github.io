/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		viewportMacbook16(): Chainable<void>;
		viewportTablet(): Chainable<void>;
		viewportMobile(): Chainable<void>;
		visitAppHome(): Chainable<void>;
	}
}
