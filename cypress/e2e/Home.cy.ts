import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants';
import type { HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import {
	HEADER_MENU_BAR_CLASS,
	SIDE_NAV_ITEMS_CLASS
} from '../support/constants.ts';

describe('Home', () => {
	const headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

	const testNavigationItems = (
		viewportFuction: () => void,
		itemSelector: string,
		openSideNavFunction?: () => void
	) => {
		viewportFuction();
		cy.visitAppHome();
		if (openSideNavFunction) {
			openSideNavFunction();
		}

		cy.get(`${itemSelector} li`).should('have.length', headerNavItems.length);

		headerNavItems.forEach((item: HeaderNavItemI, index: number) => {
			cy.get(`${itemSelector} li a span`).eq(index).should('have.text', item.text);
		});
	};

	it('MACBOOK 16: should allow access to the navigation items', () => {
		testNavigationItems(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS, undefined);
	});

	it('TABLET: should allow access to the navigation items', () => {
		testNavigationItems(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
	});

	it('MOBILE: should allow access to the navigation items', () => {
		testNavigationItems(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
	});
});
