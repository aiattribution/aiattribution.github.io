/// <reference types="cypress" />

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
