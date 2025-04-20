import {
	AIContributionOptions,
	AIInitiativeOptions,
	AIProportionOptions,
	HumanReviewOptions
} from '../../models/tag-library';
import { AttributionType, FormItemType, type FormItemI, type StatementOption } from './interfaces';

export const CREATE_ATTRIBUTION_SECTION_TITLE: string = 'Create an attribution statement';

export const AI_PROPORTIONS_OPTIONS: StatementOption[] = [
	{
		option: AIProportionOptions.ENTIRELY_AI_GENERATED
	},
	{
		option: AIProportionOptions.PRIMARILY_AI_GENERATED
	},
	{
		option: AIProportionOptions.HUMAN_AI_BLEND
	},
	{
		option: AIProportionOptions.PRIMARILY_HUMAN_CREATED
	},
	{
		option: AIProportionOptions.ENTIRELY_HUMAN_CREATED
	}
];

export const AI_CONTRIBUTION_OPTIONS: StatementOption[] = [
	{
		option: AIContributionOptions.STYLISTIC_EDITS,
		tooltipDescription:
			'AI made stylistic edits to human-created content, such as changes to structure, wording, or clarity.'
	},
	{
		option: AIContributionOptions.CONTENT_EDITS,
		tooltipDescription:
			'AI made content edits to human-created content, such as changes to scope, information, or ideas.'
	},
	{
		option: AIContributionOptions.NEW_CONTENT,
		tooltipDescription: 'AI created or added content, such as new text, images, analysis, or ideas.'
	}
];

export const AI_INITIATIVE_OPTIONS: StatementOption[] = [
	{
		option: AIInitiativeOptions.HUMAN_INITIATED,
		tooltipDescription: 'AI was prompted for its contributions, or AI assistance was enabled.'
	},
	{
		option: AIInitiativeOptions.AI_INITIATED,
		tooltipDescription:
			'AI made proactive contributions, such as via auto-completion or unprompted changes.'
	}
];

export const HUMAN_REVIEW_OPTIONS: StatementOption[] = [
	{
		option: HumanReviewOptions.REVIEWED_AND_APPROVED
	},
	{
		option: HumanReviewOptions.NOT_REVIEWED
	}
];

export const ATTRIBUTION_FORM_ITEMS: FormItemI[] = [
	{
		id: 1,
		isItemOpen: true,
		isItemDisabled: false,
		attributionType: AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
		text: 'How much of this work was created or assisted by AI?',
		typeOfItem: FormItemType.radioButton,
		options: AI_PROPORTIONS_OPTIONS,
		selectedOptions: ['']
	},
	{
		id: 2,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.AI_CONTRIBUTION,
		text: 'AI contributions',
		typeOfItem: FormItemType.checkbox,
		options: AI_CONTRIBUTION_OPTIONS,
		selectedOptions: []
	},
	{
		id: 3,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.AI_INITIATIVE,
		text: 'Initiative',
		typeOfItem: FormItemType.checkbox,
		options: AI_INITIATIVE_OPTIONS,
		selectedOptions: []
	},
	{
		id: 4,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.HUMAN_REVIEW,
		text: 'Human review',
		typeOfItem: FormItemType.radioButton,
		options: HUMAN_REVIEW_OPTIONS,
		selectedOptions: ['']
	},
	{
		id: 5,
		isItemOpen: false,
		isItemDisabled: false,
		attributionType: AttributionType.MODEL,
		text: 'Model or application used',
		typeOfItem: FormItemType.textInput,
		options: [],
		selectedOptions: [''],
		tooltipDescription: 'Examples: ChatGPT, DALL-E, llama-3-3-70b-instruct, granite3.2'
	}
];

export const AIA: string = 'AIA';
export const NO_AI_USED_ABBREVIATED_STATEMENT: string = 'No AI';
export const NO_AI_USED_FULL_STATEMENT: string = 'AI not used';
export const VERSION: string = '1.0';

export const AIA_EXPLANATION: string =
	'AIA: This prefix is used to identify an AI attribution statement.';
export const VERSION_EXPLANATION: string =
	'1.0: Version number of the attribution statement. The version will change as we update the components of the statement.';
