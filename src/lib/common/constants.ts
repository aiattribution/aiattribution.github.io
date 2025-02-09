import { AIContributionOptions, type TagI } from '$lib/models/tag-library';

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
