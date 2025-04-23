import { CREATE_ATTRIBUTION_SECTION_TITLE } from '../../src/lib/components/create-attribution-statement/constants.ts';
import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants';
import type { HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import { INTERPRET_ATTRIBUTION_SECTION_TITLE } from '../../src/lib/components/interpret-attribution/constants.ts';
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
		cy.verifyLink('CHI 2025 paper', 'https://arxiv.org/pdf/2502.18357');
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

describe('should open the GitHub repo issues link successfully', () => {
	const testGitHubRepoIssuesLink = (viewportFuction: () => void) => {
		viewportFuction();
		cy.visitAppHome();
		cy.verifyLink('GitHub', 'https://github.com/aiattribution/aiattribution.github.io/issues');
	};

	it(TEST_MACBOOK_16, () => {
		testGitHubRepoIssuesLink(cy.viewportMacbook16);
	});

	it(TEST_TABLET, () => {
		testGitHubRepoIssuesLink(cy.viewportTablet);
	});

	it(TEST_MOBILE, () => {
		testGitHubRepoIssuesLink(cy.viewportMobile);
	});
});

describe('should navigate to the attribution statement creation section when clicking the "Create an attribution" button', () => {
	const testClickCreateAnAttributionButton = (viewportFuction: () => void): void => {
		viewportFuction();
		cy.visitAppHome();
		cy.get('.button-set').find('button').contains('Create an attribution').click();
		const sectionTitleClass: string = '.section-title';
		cy.get(sectionTitleClass).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	};

	it(TEST_MACBOOK_16, () => {
		testClickCreateAnAttributionButton(cy.viewportMacbook16);
	});

	it(TEST_TABLET, () => {
		testClickCreateAnAttributionButton(cy.viewportTablet);
	});

	it(TEST_MOBILE, () => {
		testClickCreateAnAttributionButton(cy.viewportMobile);
	});
});

describe('should navigate to the attribution statement interpretation section when clicking the "Interpret an attribution" button', () => {
	const testClickInterpretAnAttributionButton = (viewportFuction: () => void): void => {
		viewportFuction();
		cy.visitAppHome();
		cy.get('.button-set').find('button').contains('Interpret an attribution').click();
		const sectionTitleClass: string = '.section-title';
		cy.get(sectionTitleClass).eq(0).should('have.text', INTERPRET_ATTRIBUTION_SECTION_TITLE);
	};

	it(TEST_MACBOOK_16, () => {
		testClickInterpretAnAttributionButton(cy.viewportMacbook16);
	});

	it(TEST_TABLET, () => {
		testClickInterpretAnAttributionButton(cy.viewportTablet);
	});

	it(TEST_MOBILE, () => {
		testClickInterpretAnAttributionButton(cy.viewportMobile);
	});
});
