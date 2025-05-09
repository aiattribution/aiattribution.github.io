import { AttributionType } from '$lib/components/create-attribution-statement/interfaces';
import {
	AIInitiatedIcon,
	CertifiedReviewIcon,
	ContentEditsIcon,
	EntirelyAIIcon,
	EntirelyHumanIcon,
	HumanAIBlendIcon,
	HumanInitiatedIcon,
	NewContentIcon,
	NoReviewIcon,
	PrimarilyAIIcon,
	PrimarilyHumanIcon,
	StylisticEditsIcon
} from '$lib/components/icons/tag-icons';
import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	HumanReviewOptions,
	type TagI,
	type TagsWithAttributionType
} from '$lib/models/tag-library';

export const APP_TITLE: string = 'AI Attribution Toolkit';

const MONDAY_FORM_ID: string = '77a998cee6979c0392ca811bfb0eabf4?r=use1';
export const MONDAY_FORM_LINK: string = `https://forms.monday.com/forms/${MONDAY_FORM_ID}`;
export const MONDAY_FORM_EMBED_LINK: string = `https://forms.monday.com/forms/embed/${MONDAY_FORM_ID}`;
export const ATTRIBUTION_FORM_ITEMS_LOCAL_STORAGE_KEY: string = 'attributionFormItems';

export const PROPORTIONS_OF_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIProportionOptions.ENTIRELY_AI_GENERATED,
		name: 'Entirely AI',
		abbreviation: 'EAI',
		explanation: 'The work was entirely AI-generated.',
		iconComponent: EntirelyAIIcon
	},
	{
		id: AIProportionOptions.PRIMARILY_AI_GENERATED,
		name: 'Primarily AI',
		abbreviation: 'PAI',
		explanation: 'The work was primarily AI-generated.',
		iconComponent: PrimarilyAIIcon
	},
	{
		id: AIProportionOptions.HUMAN_AI_BLEND,
		name: 'Human-AI blend',
		abbreviation: 'HAb',
		explanation: 'The work was created with an even blend of human and AI contributions.',
		iconComponent: HumanAIBlendIcon
	},
	{
		id: AIProportionOptions.PRIMARILY_HUMAN_CREATED,
		name: 'Primarily human',
		abbreviation: 'Ph',
		explanation: 'The work was primarily human-created.',
		iconComponent: PrimarilyHumanIcon
	},
	{
		id: AIProportionOptions.ENTIRELY_HUMAN_CREATED,
		name: 'Entirely human',
		abbreviation: 'Eh',
		explanation: 'This work was entirely human-created, without the use of AI.',
		iconComponent: EntirelyHumanIcon
	}
];

export const AI_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIContributionOptions.STYLISTIC_EDITS,
		name: AIContributionOptions.STYLISTIC_EDITS,
		abbreviation: 'Se',
		explanation:
			'AI was used to make stylistic edits, such as changes to structure, wording, and clarity.',
		iconComponent: StylisticEditsIcon
	},
	{
		id: AIContributionOptions.CONTENT_EDITS,
		name: AIContributionOptions.CONTENT_EDITS,
		abbreviation: 'Ce',
		explanation:
			'AI was used to make content edits, such as changes to scope, information, and ideas.',
		iconComponent: ContentEditsIcon
	},
	{
		id: AIContributionOptions.NEW_CONTENT,
		name: AIContributionOptions.NEW_CONTENT,
		abbreviation: 'Nc',
		explanation: 'AI was used to make new content, such as text, images, analysis, and ideas.',
		iconComponent: NewContentIcon
	}
];

export const AI_INITIATIVE_TAGS: TagI[] = [
	{
		id: AIInitiativeOptions.HUMAN_INITIATED,
		name: AIInitiativeOptions.HUMAN_INITIATED,
		abbreviation: 'Hin',
		explanation: 'AI was prompted for its contributions, or AI assistance was enabled.',
		iconComponent: HumanInitiatedIcon
	},
	{
		id: AIInitiativeOptions.AI_INITIATED,
		name: AIInitiativeOptions.AI_INITIATED,
		abbreviation: 'Ain',
		explanation:
			'The AI made proactive contributions, such as via auto-completion or unprompted changes.',
		iconComponent: AIInitiatedIcon
	}
];

export const HUMAN_REVIEW_TAGS: TagI[] = [
	{
		id: HumanReviewOptions.REVIEWED_AND_APPROVED,
		name: 'Reviewed',
		abbreviation: 'R',
		explanation: 'AI-generated content was reviewed and approved.',
		iconComponent: CertifiedReviewIcon
	},
	{
		id: HumanReviewOptions.NOT_REVIEWED,
		name: 'No human review',
		abbreviation: 'Nr',
		explanation: 'AI-generated content was not reviewed.',
		iconComponent: NoReviewIcon
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
