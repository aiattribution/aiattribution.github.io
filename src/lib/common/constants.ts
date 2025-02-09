import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	type TagI
} from '$lib/models/tag-library';

export const APP_TITLE: string = 'AI Attribution Toolkit';

export const AI_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		selection: AIContributionOptions.STYLISTIC_EDITS,
		icon: '/tag-icons/ai-contributions-icons/stylistic-edits-icon.svg',
		abbreviation: 'Se',
		name: AIContributionOptions.STYLISTIC_EDITS,
		explanation:
			'AI was used to make stylistic edits, such as changes to structure, clarity, and tone.'
	},
	{
		selection: AIContributionOptions.CONTENT_EDITS,
		icon: '/tag-icons/ai-contributions-icons/content-edits-icon.svg',
		abbreviation: 'Ce',
		name: AIContributionOptions.CONTENT_EDITS,
		explanation:
			'AI was used to make content edits, such as changes to scope, information, and ideas.'
	},
	{
		selection: AIContributionOptions.NEW_CONTENT,
		icon: '/tag-icons/ai-contributions-icons/new-content-icon.svg',
		abbreviation: 'Nc',
		name: AIContributionOptions.NEW_CONTENT,
		explanation: 'AI was used to make new content, such as text, analysis, and ideas.'
	}
];

export const PROPORTIONS_OF_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		selection: AIProportionOptions.ENTIRELY_AI_GENERATED,
		icon: '/tag-icons/proportion-of-contributions-icons/entirely-ai-icon.svg',
		abbreviation: 'EAI',
		name: 'Entirely AI',
		explanation: 'The work was entirely AI-created.'
	},
	{
		selection: AIProportionOptions.PRIMARILY_AI_GENERATED,
		icon: '/tag-icons/proportion-of-contributions-icons/primarily-ai-icon.svg',
		abbreviation: 'PAI',
		name: 'Primarily AI',
		explanation: 'The work was primarily AI-created.'
	},
	{
		selection: AIProportionOptions.HUMAN_AI_BLEND,
		icon: '/tag-icons/proportion-of-contributions-icons/human-ai-blend-icon.svg',
		abbreviation: 'HAb',
		name: 'Human-AI blend',
		explanation: 'The work was created with an even blend of human and AI contributions.'
	},
	{
		selection: AIProportionOptions.PRIMARILY_HUMAN_CREATED,
		icon: '/tag-icons/proportion-of-contributions-icons/primarily-human-icon.svg',
		abbreviation: 'Ph',
		name: 'Primarily human',
		explanation: 'The work was primarily human-created.'
	}
];

export const AI_INITIATIVE_TAGS: TagI[] = [
	{
		selection: AIInitiativeOptions.AI_WAS_PROMPTED,
		icon: '/tag-icons/ai-initiative-icons/prompted-icon.svg',
		abbreviation: 'Pm',
		name: 'AI prompted',
		explanation: 'The authors prompted the AI for its contributions.'
	},
	{
		selection: AIInitiativeOptions.AI_PROACTIVELY_SUGGESTED,
		icon: '/tag-icons/ai-initiative-icons/proactive-suggestions-icon.svg',
		abbreviation: 'Pv',
		name: 'AI proactive',
		explanation:
			'The AI proactively made suggestions, such as auto-completion or unprompted changes.'
	}
];

export const HUMAN_REVIEW_TAGS: TagI[] = [
	{
		selection: 'Reviewed and approved',
		icon: '/tag-icons/human-review-icons/certified-review-icon.svg',
		abbreviation: 'R',
		name: 'Human reviewed',
		explanation: 'The authors affirmed that all AI-generated content was reviewed and approved.'
	},
	{
		selection: 'Not reviewed',
		icon: '/tag-icons/human-review-icons/no-review-icon.svg',
		abbreviation: 'Nr',
		name: 'No human review',
		explanation: 'AI-generated content was not reviewed.'
	}
];
