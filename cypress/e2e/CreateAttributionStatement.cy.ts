import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants.ts';
import { HeaderNavType, type HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import {
	CREATE_ATTRIBUTION_SECTION_TITLE,
	HEADER_MENU_BAR_CLASS,
	SIDE_NAV_ITEMS_CLASS,
	TEST_MACBOOK_16,
	TEST_MOBILE,
	TEST_TABLET
} from '../support/constants.ts';

describe('Attribution Statement Creation', () => {
	const headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

	const openCreateAttributionSection = (
		viewportFuction: () => void,
		itemSelector: string,
		openSideNavFunction?: () => void
	) => {
		viewportFuction();
		cy.visitAppHome();
		if (openSideNavFunction) {
			openSideNavFunction();
		}

		for (const [index, item] of headerNavItems.entries()) {
			if (item.text === HeaderNavType.CREATE_ATTRIBUTION) {
				cy.get(`${itemSelector} li a`).eq(index).click();
				break;
			}
		}

		if (openSideNavFunction) {
			openSideNavFunction();
		}
	};

	it(`${TEST_MACBOOK_16}: should allow access to the navigation item for creating an attribution statement`, () => {
		openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
		cy.get('.section-title').should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(`${TEST_TABLET}: should allow access to the navigation item for creating an attribution statement`, () => {
		openCreateAttributionSection(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		cy.get('.section-title').should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(`${TEST_MOBILE}: should allow access to the navigation item for creating an attribution statement`, () => {
		openCreateAttributionSection(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		cy.get('.section-title').should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});
});
