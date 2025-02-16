import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	HumanReviewOptions
} from '$lib/models/tag-library';
import { AttributionType, FormItemType, type FormItemI } from './interfaces';

export const ATTRIBUTION_FORM_ITEMS: FormItemI[] = [
	{
		id: 1,
		isItemOpen: true,
		isItemDisabled: false,
		attributionType: AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
		text: 'How much of this work was created or assisted by AI?',
		typeOfItem: FormItemType.radioButton,
		options: Object.values(AIProportionOptions),
		selectedOptions: ['']
	},
	{
		id: 2,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.MODEL,
		text: 'Model or application used',
		typeOfItem: FormItemType.textInput,
		options: [],
		selectedOptions: ['']
	},
	{
		id: 3,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.AI_CONTRIBUTION,
		text: 'AI contributions',
		typeOfItem: FormItemType.checkbox,
		options: Object.values(AIContributionOptions),
		selectedOptions: []
	},
	{
		id: 4,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.AI_INITIATIVE,
		text: 'Initiative',
		typeOfItem: FormItemType.radioButton,
		options: Object.values(AIInitiativeOptions),
		selectedOptions: []
	},
	{
		id: 5,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.HUMAN_REVIEW,
		text: 'Human review',
		typeOfItem: FormItemType.radioButton,
		options: Object.values(HumanReviewOptions),
		selectedOptions: ['']
	}
];

export const AIA: string = 'AIA';
export const NO_AI_USED_ABBREVIATED_STATEMENT: string = 'No AI';
export const NO_AI_USED_FULL_STATEMENT: string = 'AI not used';
export const VERSION: string = '1.0';
