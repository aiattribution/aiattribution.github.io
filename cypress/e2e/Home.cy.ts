import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants';
import type { HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';

describe('Home', () => {
	it('should allow access to the navigation items', () => {
		let headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

		cy.visit('https://localhost:5173/');
		cy.get('.bx--header__menu-trigger').click();
		cy.get('.bx--side-nav__items li').should('have.length', headerNavItems.length);

		headerNavItems.forEach((item: HeaderNavItemI, index: number) => {
			cy.get('.bx--side-nav__items li a span').eq(index).should('have.text', item.text);
		});
	});
});
