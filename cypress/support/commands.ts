/// <reference types="cypress" />

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
