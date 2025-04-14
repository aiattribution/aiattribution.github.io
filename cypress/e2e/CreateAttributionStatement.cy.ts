import {
	ATTRIBUTION_FORM_ITEMS,
	CREATE_ATTRIBUTION_SECTION_TITLE
} from '../../src/lib/components/create-attribution-statement/constants.ts';
import {
	AttributionType,
	type FormItemI
} from '../../src/lib/components/create-attribution-statement/interfaces.ts';
import { HEADER_NAV_ITEMS } from '../../src/lib/components/header/constants.ts';
import { HeaderNavType, type HeaderNavItemI } from '../../src/lib/components/header/interfaces.ts';
import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	HumanReviewOptions
} from '../../src/lib/models/tag-library.ts';
import {
	HEADER_MENU_BAR_CLASS,
	SIDE_NAV_ITEMS_CLASS,
	TEST_MACBOOK_16,
	TEST_MOBILE,
	TEST_TABLET
} from '../support/constants.ts';
import { getTagDescriptions } from '../support/utils.ts';

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
const formItemDivisionClass: string = '.form-item-division';
const formItemOptionsContainerClass: string = '.form-item-options-container';

const testInitialFormState = (checkOptionsOnlyInFirstItem: boolean): void => {
	cy.verifyElementCount(
		`${attributionFormItemsClass} ${formItemContainerClass}`,
		attributionFormItems.length
	);
	cy.verifyElementCount(
		`${attributionFormItemsClass} ${formItemDivisionClass}`,
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

describe('should initialize the form with correct default state', () => {
	it(TEST_MACBOOK_16, () => {
		openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
		testInitialFormState(false);
	});

	it(TEST_TABLET, () => {
		openCreateAttributionSection(cy.viewportTablet, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		testInitialFormState(true);
	});

	it(TEST_MOBILE, () => {
		openCreateAttributionSection(cy.viewportMobile, SIDE_NAV_ITEMS_CLASS, () =>
			cy.clickHamburgerMenuButton()
		);
		testInitialFormState(true);
	});
});

describe(`should correctly set form state when AI proportion is '${AIProportionOptions.ENTIRELY_AI_GENERATED}'`, () => {
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
		cy.shouldNotHaveEmptyCreateStatementFormState([AIProportionOptions.ENTIRELY_AI_GENERATED]);
		const tagDescriptions: string[] = getTagDescriptions([
			AIProportionOptions.ENTIRELY_AI_GENERATED
		]);
		cy.shouldHaveExpectedAttributionStatementExplanation(tagDescriptions.length, tagDescriptions);
	});
});

describe(`should correctly set form state when AI proportion is '${AIProportionOptions.ENTIRELY_HUMAN_CREATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
		cy.contains('label', AIProportionOptions.ENTIRELY_HUMAN_CREATED).click();
		attributionFormItems.forEach((attributionFormItem: FormItemI, index: number) => {
			if (attributionFormItem.attributionType === AttributionType.PROPORTIONS_OF_CONTRIBUTIONS) {
				cy.shouldNotHaveDisabledClass(
					`${attributionFormItemsClass} ${formItemContainerClass}`,
					index
				);
			} else {
				cy.shouldHaveDisabledClass(`${attributionFormItemsClass} ${formItemContainerClass}`, index);
			}
		});
		cy.shouldNotHaveEmptyCreateStatementFormState([AIProportionOptions.ENTIRELY_HUMAN_CREATED]);
		const tagDescriptions: string[] = [];
		cy.shouldHaveExpectedAttributionStatementExplanation(tagDescriptions.length, []);
	});
});

const writeModelName = (modelName: string): void => {
	let formItemText: string = '';
	for (const [_, item] of attributionFormItems.entries()) {
		if (item.attributionType === AttributionType.MODEL) {
			formItemText = item.text;
			break;
		}
	}
	cy.contains('.form-item-text', formItemText)
		.closest('.form-item-container')
		.find('.form-item-options-container')
		.find('.text-input')
		.type(modelName);
};

const testAIProportionsThatDoNotHaveSpecialCases = (tagIds: string[], modelName?: string) => {
	openCreateAttributionSection(cy.viewportMacbook16, HEADER_MENU_BAR_CLASS);
	if (modelName) {
		writeModelName(modelName);
	}
	tagIds.forEach((tagId: string) => {
		cy.contains('label', tagId).click();
	});
	attributionFormItems.forEach((_, index: number) => {
		cy.shouldNotHaveDisabledClass(`${attributionFormItemsClass} ${formItemContainerClass}`, index);
	});
	cy.shouldNotHaveEmptyCreateStatementFormState(tagIds, modelName);
	const tagDescriptions: string[] = getTagDescriptions(tagIds);
	cy.shouldHaveExpectedAttributionStatementExplanation(tagDescriptions.length, tagDescriptions);
};

describe(`should correctly set form state when AI proportion is '${AIProportionOptions.PRIMARILY_AI_GENERATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIProportionOptions.PRIMARILY_AI_GENERATED]);
	});
});

describe(`should correctly set form state when AI proportion is '${AIProportionOptions.HUMAN_AI_BLEND}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIProportionOptions.HUMAN_AI_BLEND]);
	});
});

describe(`should correctly set form state when AI proportion is '${AIProportionOptions.PRIMARILY_HUMAN_CREATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIProportionOptions.PRIMARILY_HUMAN_CREATED]);
	});
});

const clearFormItemSelection = (attributionType: AttributionType): void => {
	let formItemText: string = '';
	for (const [_, item] of attributionFormItems.entries()) {
		if (item.attributionType === attributionType) {
			formItemText = item.text;
			break;
		}
	}
	cy.contains('.form-item-text', formItemText)
		.closest('.form-item-text-container')
		.find('button')
		.contains('Clear')
		.click();
};

describe(`should correctly set form state when AI proportion is selected and then cleared`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIProportionOptions.PRIMARILY_AI_GENERATED]);
		clearFormItemSelection(AttributionType.PROPORTIONS_OF_CONTRIBUTIONS);
		testInitialFormState(false);
	});
});

describe(`should correctly set form state when AI contributions is '${AIContributionOptions.STYLISTIC_EDITS}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIContributionOptions.STYLISTIC_EDITS]);
	});
});

describe(`should correctly set form state when AI contributions are '${AIContributionOptions.CONTENT_EDITS}' and '${AIContributionOptions.NEW_CONTENT}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([
			AIContributionOptions.CONTENT_EDITS,
			AIContributionOptions.NEW_CONTENT
		]);
	});
});

describe(`should correctly set form state when AI contributions are '${AIContributionOptions.NEW_CONTENT}' and '${AIContributionOptions.CONTENT_EDITS}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([
			AIContributionOptions.NEW_CONTENT,
			AIContributionOptions.CONTENT_EDITS
		]);
	});
});

describe(`should correctly set form state when AI contributions are '${AIContributionOptions.NEW_CONTENT}' and '${AIContributionOptions.CONTENT_EDITS}' and when AI proportion is '${AIProportionOptions.PRIMARILY_AI_GENERATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([
			AIContributionOptions.NEW_CONTENT,
			AIContributionOptions.CONTENT_EDITS,
			AIProportionOptions.PRIMARILY_AI_GENERATED
		]);
	});
});

describe(`should correctly set form state when AI Initiative is '${AIInitiativeOptions.HUMAN_INITIATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIInitiativeOptions.HUMAN_INITIATED]);
	});
});

describe(`should correctly set form state when AI Initiative is '${AIInitiativeOptions.AI_INITIATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([AIInitiativeOptions.AI_INITIATED]);
	});
});

describe(`should correctly set form state when AI Initiative are '${AIInitiativeOptions.AI_INITIATED}' and '${AIInitiativeOptions.HUMAN_INITIATED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([
			AIInitiativeOptions.AI_INITIATED,
			AIInitiativeOptions.HUMAN_INITIATED
		]);
	});
});

describe(`should correctly set form state when Human Review is '${HumanReviewOptions.REVIEWED_AND_APPROVED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([HumanReviewOptions.REVIEWED_AND_APPROVED]);
	});
});

describe(`should correctly set form state when Human Review is '${HumanReviewOptions.NOT_REVIEWED}'`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([HumanReviewOptions.NOT_REVIEWED]);
	});
});

describe(`should correctly set form state when multiple form items are selected`, () => {
	it(TEST_MACBOOK_16, () => {
		testAIProportionsThatDoNotHaveSpecialCases([
			HumanReviewOptions.REVIEWED_AND_APPROVED,
			AIContributionOptions.NEW_CONTENT,
			AIContributionOptions.CONTENT_EDITS,
			AIInitiativeOptions.HUMAN_INITIATED,
			AIProportionOptions.PRIMARILY_AI_GENERATED
		]);
	});
});

describe(`should correctly set form state when only the model is set`, () => {
	it(TEST_MACBOOK_16, () => {
		const modelName: string = 'granite-3-8b-instruct';
		testAIProportionsThatDoNotHaveSpecialCases([], modelName);
	});
});
