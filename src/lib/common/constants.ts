import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	HumanReviewOptions,
	type TagI
} from '$lib/models/tag-library';

export const APP_TITLE: string = 'AI Attribution Toolkit';

const MONDAY_FORM_ID: string = '77a998cee6979c0392ca811bfb0eabf4?r=use1';
export const MONDAY_FORM_LINK: string = `https://forms.monday.com/forms/${MONDAY_FORM_ID}`;
export const MONDAY_FORM_EMBED_LINK: string = `https://forms.monday.com/forms/embed/${MONDAY_FORM_ID}`;

export const AI_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIContributionOptions.STYLISTIC_EDITS,
		selection: AIContributionOptions.STYLISTIC_EDITS,
		icon: '/tag-icons/ai-contributions-icons/stylistic-edits-icon.svg',
		abbreviation: 'Se',
		name: AIContributionOptions.STYLISTIC_EDITS,
		explanation:
			'AI was used to make stylistic edits, such as changes to structure, clarity, and tone.'
	},
	{
		id: AIContributionOptions.CONTENT_EDITS,
		selection: AIContributionOptions.CONTENT_EDITS,
		icon: '/tag-icons/ai-contributions-icons/content-edits-icon.svg',
		abbreviation: 'Ce',
		name: AIContributionOptions.CONTENT_EDITS,
		explanation:
			'AI was used to make content edits, such as changes to scope, information, and ideas.'
	},
	{
		id: AIContributionOptions.NEW_CONTENT,
		selection: AIContributionOptions.NEW_CONTENT,
		icon: '/tag-icons/ai-contributions-icons/new-content-icon.svg',
		abbreviation: 'Nc',
		name: AIContributionOptions.NEW_CONTENT,
		explanation: 'AI was used to make new content, such as text, analysis, and ideas.'
	}
];

export const PROPORTIONS_OF_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIProportionOptions.ENTIRELY_AI_GENERATED,
		selection: AIProportionOptions.ENTIRELY_AI_GENERATED,
		icon: '/tag-icons/proportion-of-contributions-icons/entirely-ai-icon.svg',
		abbreviation: 'EAI',
		name: 'Entirely AI',
		explanation: 'The work was entirely AI-created.'
	},
	{
		id: AIProportionOptions.PRIMARILY_AI_GENERATED,
		selection: AIProportionOptions.PRIMARILY_AI_GENERATED,
		icon: '/tag-icons/proportion-of-contributions-icons/primarily-ai-icon.svg',
		abbreviation: 'PAI',
		name: 'Primarily AI',
		explanation: 'The work was primarily AI-created.'
	},
	{
		id: AIProportionOptions.HUMAN_AI_BLEND,
		selection: AIProportionOptions.HUMAN_AI_BLEND,
		icon: '/tag-icons/proportion-of-contributions-icons/human-ai-blend-icon.svg',
		abbreviation: 'HAb',
		name: 'Human-AI blend',
		explanation: 'The work was created with an even blend of human and AI contributions.'
	},
	{
		id: AIProportionOptions.PRIMARILY_HUMAN_CREATED,
		selection: AIProportionOptions.PRIMARILY_HUMAN_CREATED,
		icon: '/tag-icons/proportion-of-contributions-icons/primarily-human-icon.svg',
		abbreviation: 'Ph',
		name: 'Primarily human',
		explanation: 'The work was primarily human-created.'
	}
];

export const AI_INITIATIVE_TAGS: TagI[] = [
	{
		id: AIInitiativeOptions.AI_WAS_PROMPTED,
		selection: AIInitiativeOptions.AI_WAS_PROMPTED,
		icon: '/tag-icons/ai-initiative-icons/prompted-icon.svg',
		abbreviation: 'Pm',
		name: 'Prompted',
		explanation: 'The authors prompted the AI for its contributions.'
	},
	{
		id: AIInitiativeOptions.AI_PROACTIVELY_SUGGESTED,
		selection: AIInitiativeOptions.AI_PROACTIVELY_SUGGESTED,
		icon: '/tag-icons/ai-initiative-icons/proactive-suggestions-icon.svg',
		abbreviation: 'Pv',
		name: 'Proactive',
		explanation:
			'The AI proactively made suggestions, such as auto-completion or unprompted changes.'
	}
];

export const HUMAN_REVIEW_TAGS: TagI[] = [
	{
		id: HumanReviewOptions.REVIEWED_AND_APPROVED,
		selection: 'Reviewed and approved',
		icon: '/tag-icons/human-review-icons/certified-review-icon.svg',
		abbreviation: 'R',
		name: 'Human reviewed',
		explanation: 'The authors affirmed that all AI-generated content was reviewed and approved.'
	},
	{
		id: HumanReviewOptions.NOT_REVIEWED,
		selection: 'Not reviewed',
		icon: '/tag-icons/human-review-icons/no-review-icon.svg',
		abbreviation: 'Nr',
		name: 'No human review',
		explanation: 'AI-generated content was not reviewed.'
	}
];

export const ALL_TAGS: TagI[] = [
	...AI_CONTRIBUTIONS_TAGS,
	...PROPORTIONS_OF_CONTRIBUTIONS_TAGS,
	...AI_INITIATIVE_TAGS,
	...HUMAN_REVIEW_TAGS
];
