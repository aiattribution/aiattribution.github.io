import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants';
import { HeaderNavType, type HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';

describe('Attribution Statement Creation', () => {
	it('should allow access to the navigation item for creating an attribution statement', () => {
		let headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

		cy.visit('https://localhost:5173/');
		cy.get('.bx--header__menu-trigger').click();

		for (const [index, item] of headerNavItems.entries()) {
			if (item.text === HeaderNavType.CREATE_ATTRIBUTION) {
				cy.get('.bx--side-nav__items li a').eq(index).click();
				break;
			}
    }

    cy.get('.bx--header__menu-trigger').click();
	});
});
