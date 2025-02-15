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

const TAG_ICONS_FOLDER: string = '/tag-icons';
const PROPORTIONS_OF_CONTRIBUTIONS_ICONS_FOLDER: string = `${TAG_ICONS_FOLDER}/proportion-of-contributions-icons`;
const AI_CONTRIBUTIONS_ICONS_FOLDER: string = `${TAG_ICONS_FOLDER}/ai-contributions-icons`;
const AI_INITIATIVE_ICONS_FOLDER: string = `${TAG_ICONS_FOLDER}/ai-initiative-icons`;
const HUMAN_REVIEW_ICONS_FOLDER: string = `${TAG_ICONS_FOLDER}/human-review-icons`;

export const PROPORTIONS_OF_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIProportionOptions.ENTIRELY_AI_GENERATED,
		name: 'Entirely AI',
		abbreviation: 'EAI',
		explanation: 'The work was entirely AI-generated.',
		icon: `${PROPORTIONS_OF_CONTRIBUTIONS_ICONS_FOLDER}/entirely-ai-icon.svg`
	},
	{
		id: AIProportionOptions.PRIMARILY_AI_GENERATED,
		name: 'Primarily AI',
		abbreviation: 'PAI',
		explanation: 'The work was primarily AI-generated.',
		icon: `${PROPORTIONS_OF_CONTRIBUTIONS_ICONS_FOLDER}/primarily-ai-icon.svg`
	},
	{
		id: AIProportionOptions.HUMAN_AI_BLEND,
		name: 'Human-AI blend',
		abbreviation: 'HAb',
		explanation: 'The work was created with an even blend of human and AI contributions.',
		icon: `${PROPORTIONS_OF_CONTRIBUTIONS_ICONS_FOLDER}/human-ai-blend-icon.svg`
	},
	{
		id: AIProportionOptions.PRIMARILY_HUMAN_CREATED,
		name: 'Primarily human',
		abbreviation: 'Ph',
		explanation: 'The work was primarily human-created.',
		icon: `${PROPORTIONS_OF_CONTRIBUTIONS_ICONS_FOLDER}/primarily-human-icon.svg`
	},
	{
		id: AIProportionOptions.ENTIRELY_HUMAN_CREATED,
		name: 'Entirely human',
		abbreviation: 'Eh',
		explanation: 'This work was entirely human-created, without the use of AI.',
		icon: `${PROPORTIONS_OF_CONTRIBUTIONS_ICONS_FOLDER}/entirely-human-icon.svg`
	}
];

export const AI_CONTRIBUTIONS_TAGS: TagI[] = [
	{
		id: AIContributionOptions.STYLISTIC_EDITS,
		name: AIContributionOptions.STYLISTIC_EDITS,
		abbreviation: 'Se',
		explanation:
			'AI was used to make stylistic edits, such as changes to structure, clarity, and tone.',
		icon: `${AI_CONTRIBUTIONS_ICONS_FOLDER}/stylistic-edits-icon.svg`
	},
	{
		id: AIContributionOptions.CONTENT_EDITS,
		name: AIContributionOptions.CONTENT_EDITS,
		abbreviation: 'Ce',
		explanation:
			'AI was used to make content edits, such as changes to scope, information, and ideas.',
		icon: `${AI_CONTRIBUTIONS_ICONS_FOLDER}/content-edits-icon.svg`
	},
	{
		id: AIContributionOptions.NEW_CONTENT,
		name: AIContributionOptions.NEW_CONTENT,
		abbreviation: 'Nc',
		explanation: 'AI was used to make new content, such as text, analysis, and ideas.',
		icon: `${AI_CONTRIBUTIONS_ICONS_FOLDER}/new-content-icon.svg`
	}
];

export const AI_INITIATIVE_TAGS: TagI[] = [
	{
		id: AIInitiativeOptions.HUMAN_INITIATED,
		name: AIInitiativeOptions.HUMAN_INITIATED,
		abbreviation: 'Hin',
		explanation: 'The authors prompted the AI for its contributions or enabled AI assistance.',
		icon: `${AI_INITIATIVE_ICONS_FOLDER}/human-initiated-icon.svg`
	},
	{
		id: AIInitiativeOptions.AI_INITIATED,
		name: AIInitiativeOptions.AI_INITIATED,
		abbreviation: 'Ain',
		explanation:
			'The AI made proactive contributions, such as auto-completion or unprompted changes.',
		icon: `${AI_INITIATIVE_ICONS_FOLDER}/ai-initiated-icon.svg`
	}
];

export const HUMAN_REVIEW_TAGS: TagI[] = [
	{
		id: HumanReviewOptions.REVIEWED_AND_APPROVED,
		name: 'Reviewed',
		abbreviation: 'R',
		explanation: 'The authors affirmed that all AI-generated content was reviewed and approved.',
		icon: `${HUMAN_REVIEW_ICONS_FOLDER}/certified-review-icon.svg`
	},
	{
		id: HumanReviewOptions.NOT_REVIEWED,
		name: 'No human review',
		abbreviation: 'Nr',
		explanation: 'AI-generated content was not reviewed.',
		icon: `${HUMAN_REVIEW_ICONS_FOLDER}/no-review-icon.svg`
	}
];

export const ALL_TAGS: TagI[] = [
	...PROPORTIONS_OF_CONTRIBUTIONS_TAGS,
	...AI_CONTRIBUTIONS_TAGS,
	...AI_INITIATIVE_TAGS,
	...HUMAN_REVIEW_TAGS
];
