import { AttributionType } from '../../src/lib/components/create-attribution-statement/interfaces';
import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	HumanReviewOptions,
	TagI
} from '../../src/lib/models/tag-library';
import { type TagsWithAttributionType } from './interfaces';

export const TEST_MACBOOK_16: string = 'MACBOOK 16';
export const TEST_TABLET: string = 'TABLET';
export const TEST_MOBILE: string = 'MOBILE';

export const HEADER_MENU_BAR_CLASS: string = '.bx--header__menu-bar';
export const HEADER_HAMBURGER_MENU_BUTTON_CLASS: string = '.bx--header__menu-trigger';
export const SIDE_NAV_ITEMS_CLASS: string = '.bx--side-nav__items';

export const PROPORTIONS_OF_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIProportionOptions.ENTIRELY_AI_GENERATED,
		name: 'Entirely AI',
		abbreviation: 'EAI',
		explanation: 'The work was entirely AI-generated.'
	},
	{
		id: AIProportionOptions.PRIMARILY_AI_GENERATED,
		name: 'Primarily AI',
		abbreviation: 'PAI',
		explanation: 'The work was primarily AI-generated.'
	},
	{
		id: AIProportionOptions.HUMAN_AI_BLEND,
		name: 'Human-AI blend',
		abbreviation: 'HAb',
		explanation: 'The work was created with an even blend of human and AI contributions.'
	},
	{
		id: AIProportionOptions.PRIMARILY_HUMAN_CREATED,
		name: 'Primarily human',
		abbreviation: 'Ph',
		explanation: 'The work was primarily human-created.'
	},
	{
		id: AIProportionOptions.ENTIRELY_HUMAN_CREATED,
		name: 'Entirely human',
		abbreviation: 'Eh',
		explanation: 'This work was entirely human-created, without the use of AI.'
	}
];

export const AI_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIContributionOptions.STYLISTIC_EDITS,
		name: AIContributionOptions.STYLISTIC_EDITS,
		abbreviation: 'Se',
		explanation:
			'AI was used to make stylistic edits, such as changes to structure, wording, and clarity.'
	},
	{
		id: AIContributionOptions.CONTENT_EDITS,
		name: AIContributionOptions.CONTENT_EDITS,
		abbreviation: 'Ce',
		explanation:
			'AI was used to make content edits, such as changes to scope, information, and ideas.'
	},
	{
		id: AIContributionOptions.NEW_CONTENT,
		name: AIContributionOptions.NEW_CONTENT,
		abbreviation: 'Nc',
		explanation: 'AI was used to make new content, such as text, images, analysis, and ideas.'
	}
];

export const AI_INITIATIVE_TAGS: TagI[] = [
	{
		id: AIInitiativeOptions.HUMAN_INITIATED,
		name: AIInitiativeOptions.HUMAN_INITIATED,
		abbreviation: 'Hin',
		explanation: 'AI was prompted for its contributions, or AI assistance was enabled.'
	},
	{
		id: AIInitiativeOptions.AI_INITIATED,
		name: AIInitiativeOptions.AI_INITIATED,
		abbreviation: 'Ain',
		explanation:
			'The AI made proactive contributions, such as via auto-completion or unprompted changes.'
	}
];

export const HUMAN_REVIEW_TAGS: TagI[] = [
	{
		id: HumanReviewOptions.REVIEWED_AND_APPROVED,
		name: 'Reviewed',
		abbreviation: 'R',
		explanation: 'AI-generated content was reviewed and approved.'
	},
	{
		id: HumanReviewOptions.NOT_REVIEWED,
		name: 'No human review',
		abbreviation: 'Nr',
		explanation: 'AI-generated content was not reviewed.'
	}
];

export const ALL_TAGS: TagI[] = [
	...PROPORTIONS_OF_CONTRIBUTIONS_TAGS,
	...AI_CONTRIBUTIONS_TAGS,
	...AI_INITIATIVE_TAGS,
	...HUMAN_REVIEW_TAGS
];

export const TAGS_WITH_ATTRIBUTION_TYPE: TagsWithAttributionType[] = [
	{
		attributionType: AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
		tags: PROPORTIONS_OF_CONTRIBUTIONS_TAGS
	},
	{
		attributionType: AttributionType.AI_CONTRIBUTION,
		tags: AI_CONTRIBUTIONS_TAGS
	},
	{
		attributionType: AttributionType.AI_INITIATIVE,
		tags: AI_INITIATIVE_TAGS
	},
	{
		attributionType: AttributionType.HUMAN_REVIEW,
		tags: HUMAN_REVIEW_TAGS
	}
];
