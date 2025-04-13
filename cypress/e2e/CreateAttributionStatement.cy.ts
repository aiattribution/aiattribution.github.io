import {
	ATTRIBUTION_FORM_ITEMS,
	CREATE_ATTRIBUTION_SECTION_TITLE
} from '../../src/lib/components/create-attribution-statement/constants.ts';
import { type FormItemI } from '../../src/lib/components/create-attribution-statement/interfaces.ts';
import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants.ts';
import { HeaderNavType, type HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import {
	HEADER_MENU_BAR_CLASS,
	SIDE_NAV_ITEMS_CLASS,
	TEST_MACBOOK_16,
	TEST_MOBILE,
	TEST_TABLET
} from '../support/constants.ts';

describe('Attribution Statement Creation', () => {
	const headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;
	const attributionFormItems: FormItemI[] = structuredClone(ATTRIBUTION_FORM_ITEMS);

	const sectionTitleClass: string = '.section-title';
	const attributionFormItemsClass: string = '.attribution-form-items';
	const formItemContainerClass: string = '.form-item-container';
	const formItemDivisionClass: string = '.form-item-division';
	const formItemOptionsContainerClass: string = '.form-item-options-container';
	const emptyStateTextClass: string = '.empty-state-text';

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
		cy.get(`${sectionTitleClass}`).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(`${TEST_TABLET}: should allow access to the navigation item for creating an attribution statement`, () => {
		openCreateAttributionSection(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		cy.get(`${sectionTitleClass}`).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(`${TEST_MOBILE}: should allow access to the navigation item for creating an attribution statement`, () => {
		openCreateAttributionSection(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		cy.get(`${sectionTitleClass}`).should('have.text', CREATE_ATTRIBUTION_SECTION_TITLE);
	});

	it(`${TEST_MACBOOK_16}: should initialize the form with correct default state`, () => {
		openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
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
					cy.get(`${formItemOptionsContainerClass}`).should('exist');
				});
		});
		cy.get(`${emptyStateTextClass}`).should('exist');
	});

	it(`${TEST_TABLET}: should initialize the form with correct default state`, () => {
		openCreateAttributionSection(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
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
					if (index === 0) {
						cy.get(`${formItemOptionsContainerClass}`).should('exist');
					} else {
						cy.get(`${formItemOptionsContainerClass}`).should('not.exist');
					}
				});
		});
		cy.get(`${emptyStateTextClass}`).should('exist');
	});

	it(`${TEST_MOBILE}: should initialize the form with correct default state`, () => {
		openCreateAttributionSection(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
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
					if (index === 0) {
						cy.get(`${formItemOptionsContainerClass}`).should('exist');
					} else {
						cy.get(`${formItemOptionsContainerClass}`).should('not.exist');
					}
				});
		});
		cy.get(`${emptyStateTextClass}`).should('exist');
	});
});
