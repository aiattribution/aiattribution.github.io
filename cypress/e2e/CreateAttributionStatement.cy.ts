import {
	AIA,
	ATTRIBUTION_FORM_ITEMS,
	CREATE_ATTRIBUTION_SECTION_TITLE,
	EXPANDED_STATEMENT_INITIAL_TEXT,
	VERSION
} from '../../src/lib/components/create-attribution-statement/constants.ts';
import {
	AttributionType,
	type FormItemI
} from '../../src/lib/components/create-attribution-statement/interfaces.ts';
import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants.ts';
import { HeaderNavType, type HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import { AIProportionOptions, TagI } from '../../src/lib/models/tag-library.ts';
import {
	ALL_TAGS,
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

		cy.shouldHaveEmptyCreateStatementFormState();
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

const allTags: TagI[] = ALL_TAGS;

const getTagAbbreviation = (tagId: string): string => {
	let tagAbbreviation: string = '';
	for (let index: number = 0; index < allTags.length; index++) {
		const tag: TagI = allTags[index];
		if (tagId === tag.id) {
			tagAbbreviation = tag.abbreviation;
			break;
		}
	}
	return tagAbbreviation;
};

const getAbbreviatedStatement = (tagId: string): string => {
	let tagAbbreviation: string = getTagAbbreviation(tagId);
	return `${AIA} ${tagAbbreviation} ${VERSION}`;
};

const getFullStatement = (tagId: string): string => {
	let tagName: string = '';
	for (let index: number = 0; index < allTags.length; index++) {
		const tag: TagI = allTags[index];
		if (tagId === tag.id) {
			tagName = tag.name;
			break;
		}
	}
	return `${AIA} ${tagName} ${VERSION}`;
};

const getTagExplanation = (tagId: string): string => {
	let tagExplanation: string = '';
	for (let index: number = 0; index < allTags.length; index++) {
		const tag: TagI = allTags[index];
		if (tagId === tag.id) {
			tagExplanation = tag.explanation;
			break;
		}
	}
	return tagExplanation;
};

const getExpandedStatement = (tagId: string): string => {
	let tagExplanation: string = getTagExplanation(tagId);
	tagExplanation = tagExplanation.replace('The work', 'this work');
	tagExplanation = tagExplanation.replace('This work', 'this work');
	return `${EXPANDED_STATEMENT_INITIAL_TEXT} ${tagExplanation}`;
};

describe("should correctly set form state when AI proportion is 'Entirely AI-generated'", () => {
	it(TEST_MACBOOK_16, () => {
		openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
		cy.contains('label', AIProportionOptions.ENTIRELY_AI_GENERATED).click();
		attributionFormItems.forEach((attributionFormItem: FormItemI, index: number) => {
			if (attributionFormItem.attributionType === AttributionType.AI_CONTRIBUTION) {
				cy.shouldHaveDisabledClass(`${attributionFormItemsClass} ${formItemContainerClass}`, index);
			} else {
				cy.shouldNotHaveDisabledClass(
					`${attributionFormItemsClass} ${formItemContainerClass}`,
					index
				);
			}
		});
		cy.shouldNotHaveEmptyCreateStatementFormState();
		cy.shouldHaveCorrectNumberOfRecommendedAttributionItems();
		cy.shouldHaveExpectedTextInRecommendedAttributionItem(
			0,
			getAbbreviatedStatement(AIProportionOptions.ENTIRELY_AI_GENERATED)
		);
		cy.shouldHaveExpectedTextInRecommendedAttributionItem(
			1,
			getFullStatement(AIProportionOptions.ENTIRELY_AI_GENERATED)
		);
		cy.shouldHaveExpectedTextInRecommendedAttributionItem(
			2,
			getExpandedStatement(AIProportionOptions.ENTIRELY_AI_GENERATED)
		);
		cy.shouldHaveExpectedAttributionStatementExplanation(
			1,
			`${getTagAbbreviation(AIProportionOptions.ENTIRELY_AI_GENERATED)}: ${getTagExplanation(AIProportionOptions.ENTIRELY_AI_GENERATED)}`
		);
	});
});
