import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	AIUsageOptions,
	HumanReviewOptions
} from '$lib/models/tag-library';
import { AttributionType, FormItemType, type FormItemI } from './interfaces';

export const ATTRIBUTION_FORM_ITEMS: FormItemI[] = [
	{
		id: 1,
		attributionType: AttributionType.AI_USED,
		text: 'Was AI used to create this content?',
		typeOfItem: FormItemType.radioButton,
		options: Object.values(AIUsageOptions),
		selectedOptions: ['']
	},
	{
		id: 2,
		attributionType: AttributionType.MODEL,
		text: 'Model or application',
		typeOfItem: FormItemType.textInput,
		options: [],
		selectedOptions: ['']
	},
	{
		id: 3,
		attributionType: AttributionType.AI_CONTRIBUTION,
		text: 'AI contributions',
		typeOfItem: FormItemType.checkbox,
		options: Object.values(AIContributionOptions),
		selectedOptions: []
	},
	{
		id: 4,
		attributionType: AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
		text: 'Proportion of work created or modified by AI',
		typeOfItem: FormItemType.radioButton,
		options: Object.values(AIProportionOptions),
		selectedOptions: ['']
	},
	{
		id: 5,
		attributionType: AttributionType.AI_INITIATIVE,
		text: 'AI initiative',
		typeOfItem: FormItemType.checkbox,
		options: Object.values(AIInitiativeOptions),
		selectedOptions: []
	},
	{
		id: 6,
		attributionType: AttributionType.HUMAN_REVIEW,
		text: 'Human review',
		typeOfItem: FormItemType.radioButton,
		options: Object.values(HumanReviewOptions),
		selectedOptions: ['']
	}
];

export const AIA: string = 'AIA';
export const AI_USED: string = 'AI used';
export const NO_AI_USED_ABBREVIATED_STATEMENT: string = 'No AI';
export const NO_AI_USED_FULL_STATEMENT: string = 'AI not used';
export const VERSION: string = '1.0';
