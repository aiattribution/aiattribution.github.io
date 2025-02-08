import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	AIUsageOptions,
	FormItemType,
	HumanReviewOptions,
	type FormItemI
} from './interfaces';

export const ATTRIBUTION_FORM_ITEMS: FormItemI[] = [
	{
		id: 1,
		text: 'Was AI used to create this content?',
		type: FormItemType.radioButton,
		options: Object.values(AIUsageOptions),
		selectedOptions: ['']
	},
	{
		id: 2,
		text: 'Model or application',
		type: FormItemType.textInput,
		options: [],
		selectedOptions: ['']
	},
	{
		id: 3,
		text: 'AI contributions',
		type: FormItemType.checkbox,
		options: Object.values(AIContributionOptions),
		selectedOptions: []
	},
	{
		id: 4,
		text: 'Proportion of work created or modified by AI',
		type: FormItemType.radioButton,
		options: Object.values(AIProportionOptions),
		selectedOptions: ['']
	},
	{
		id: 5,
		text: 'AI initiative',
		type: FormItemType.checkbox,
		options: Object.values(AIInitiativeOptions),
		selectedOptions: []
	},
	{
		id: 6,
		text: 'Human review',
		type: FormItemType.radioButton,
		options: Object.values(HumanReviewOptions),
		selectedOptions: ['']
	}
];

export const AIA: string = 'AIA';
export const AI_USED: string = 'AI used';
export const NO_AI_USED_ABBREVIATED_STATEMENT: string = 'No AI';
export const NO_AI_USED_FULL_STATEMENT: string = 'AI not used';
export const VERSION: string = '1.0';
