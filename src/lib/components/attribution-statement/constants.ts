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
		options: Object.values(AIUsageOptions)
	},
	{
		id: 2,
		text: 'Model or application',
		type: FormItemType.textInput,
		options: []
	},
	{
		id: 3,
		text: 'AI contributions',
		type: FormItemType.checkbox,
		options: Object.values(AIContributionOptions)
	},
	{
		id: 4,
		text: 'Proportion of work created or modified by AI',
		type: FormItemType.radioButton,
		options: Object.values(AIProportionOptions)
	},
	{
		id: 5,
		text: 'AI initiative',
		type: FormItemType.checkbox,
		options: Object.values(AIInitiativeOptions)
	},
	{
		id: 6,
		text: 'Human review',
		type: FormItemType.radioButton,
		options: Object.values(HumanReviewOptions)
	}
];
