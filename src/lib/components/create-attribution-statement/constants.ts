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
			'AI made stylistic edits to human-created work, such as changes to structure, wording, or clarity.'
	},
	{
		option: AIContributionOptions.CONTENT_EDITS,
		tooltipDescription:
			'AI made content edits to human-created work, such as changes to scope, information, or ideas.'
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
			'AI made proactive contributions without human request, such as auto-completed suggestions or additions.'
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
		text: 'Who initiated AI contributions?',
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
export const NO_AI_USED: string = 'No AI';
export const VERSIONS: string[] = ['1.0', 'v1.0'];
export const LAST_VERSION: string = VERSIONS[VERSIONS.length - 1];

export const AIA_EXPLANATION: string =
	'AIA: This prefix is used to identify an AI attribution statement.';
export const getVersionExplanation = (version: string): string => {
	return `${version}: Version number of the attribution statement. This number will change as the attribution tool evolves.`;
};

export const AIA_INTERPRET_STATEMENT_EXPLANATION: string =
	'AIA is the standard prefix used to denote the start of an AI attribution statement.';
export const getVersionInterpretStatementExplanation = (version: string): string => {
	return `${version} refers to the version number of the attribution statement — this number will change as the attribution tool evolves.`;
};
