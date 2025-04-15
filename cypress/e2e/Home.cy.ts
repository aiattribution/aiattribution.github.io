import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants';
import type { HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import {
	HEADER_MENU_BAR_CLASS,
	SIDE_NAV_ITEMS_CLASS,
	TEST_MACBOOK_16,
	TEST_MOBILE,
	TEST_TABLET
} from '../support/constants.ts';

describe('should allow access to the navigation items', () => {
	const headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

	const testNavigationItems = (
		viewportFuction: () => void,
		navigationSelector: string,
		openSideNavFunction?: () => void
	) => {
		viewportFuction();
		cy.visitAppHome();
		if (openSideNavFunction) {
			openSideNavFunction();
		}

		cy.verifyElementCount(`${navigationSelector} li`, headerNavItems.length);

		headerNavItems.forEach((item: HeaderNavItemI, index: number) => {
			cy.get(`${navigationSelector} li a span`).eq(index).should('have.text', item.text);
		});
	};

	it(TEST_MACBOOK_16, () => {
		testNavigationItems(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
	});

	it(TEST_TABLET, () => {
		testNavigationItems(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
	});

	it(TEST_MOBILE, () => {
		testNavigationItems(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
	});
});

describe('should open the CHI 2025 paper link successfully', () => {
	const testChiPaperLink = (viewportFuction: () => void) => {
		viewportFuction();
		cy.visitAppHome();
		cy.contains('a.paper-link', 'CHI 2025 paper')
			.should('have.attr', 'href', 'https://arxiv.org/pdf/2502.18357')
			.and('have.attr', 'target', '_blank');
	};

	it(TEST_MACBOOK_16, () => {
		testChiPaperLink(cy.viewportMacbook16);
	});

	it(TEST_TABLET, () => {
		testChiPaperLink(cy.viewportTablet);
	});

	it(TEST_MOBILE, () => {
		testChiPaperLink(cy.viewportMobile);
	});
});
