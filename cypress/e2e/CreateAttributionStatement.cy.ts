import {
	ATTRIBUTION_FORM_ITEMS,
	CREATE_ATTRIBUTION_SECTION_TITLE
} from '../../src/lib/components/create-attribution-statement/constants.ts';
import {
	type FormItemI
} from '../../src/lib/components/create-attribution-statement/interfaces.ts';
import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants.ts';
import { HeaderNavType, type HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import {
	HEADER_MENU_BAR_CLASS,
	SIDE_NAV_ITEMS_CLASS,
	TEST_MACBOOK_16,
	TEST_MOBILE,
	TEST_TABLET
} from '../support/constants.ts';

const headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

const openCreateAttributionSection = (
	viewportFuction: () => void,
	navigationSelector: string,
	openSideNavFunction?: () => void
): void => {
	viewportFuction();
	cy.visitAppHome();
	if (openSideNavFunction) {
		openSideNavFunction();
	}

	for (const [index, item] of headerNavItems.entries()) {
		if (item.text === HeaderNavType.CREATE_ATTRIBUTION) {
			cy.get(`${navigationSelector} li a`).eq(index).click();
			break;
		}
	}

	if (openSideNavFunction) {
		openSideNavFunction();
	}
};

describe('should allow access to the navigation item for creating an attribution statement', () => {
	const sectionTitleClass: string = '.section-title';

	it(TEST_MACBOOK_16, () => {
		openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
		cy.get(sectionTitleClass).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(TEST_TABLET, () => {
		openCreateAttributionSection(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		cy.get(sectionTitleClass).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(TEST_MOBILE, () => {
		openCreateAttributionSection(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		cy.get(sectionTitleClass).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});
});

const attributionFormItems: FormItemI[] = structuredClone(ATTRIBUTION_FORM_ITEMS);
const attributionFormItemsClass: string = '.attribution-form-items';
const formItemContainerClass: string = '.form-item-container';
const emptyStateTextClass: string = '.empty-state-text';

describe('should initialize the form with correct default state', () => {
	const formItemDivisionClass: string = '.form-item-division';
	const formItemOptionsContainerClass: string = '.form-item-options-container';

	const testInitialFormState = (
		viewportFuction: () => void,
		navigationSelector: string,
		checkOptionsOnlyInFirstItem: boolean,
		openSideNavFunction?: () => void
	): void => {
		openCreateAttributionSection(viewportFuction, navigationSelector, openSideNavFunction);

		cy.get(`${attributionFormItemsClass} ${formItemContainerClass}`).should(
			'have.length',
			attributionFormItems.length
		);
		cy.get(`${attributionFormItemsClass} ${formItemDivisionClass}`).should(
			'have.length',
			attributionFormItems.length
		);

		attributionFormItems.forEach((_, index: number) => {
			cy.get(`${attributionFormItemsClass} ${formItemContainerClass}`)
				.eq(index)
				.within(() => {
					if (!checkOptionsOnlyInFirstItem || index === 0) {
						cy.get(formItemOptionsContainerClass).should('exist');
					} else {
						cy.get(formItemOptionsContainerClass).should('not.exist');
					}
				});
		});

		cy.get(emptyStateTextClass).should('exist');
	};

	it(TEST_MACBOOK_16, () => {
		testInitialFormState(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS, false);
	});

	it(TEST_TABLET, () => {
		testInitialFormState(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, true, () =>
			cy.clickHamburgerMenuButton()
		);
	});

	it(TEST_MOBILE, () => {
		testInitialFormState(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, true, () =>
			cy.clickHamburgerMenuButton()
		);
	});
});
