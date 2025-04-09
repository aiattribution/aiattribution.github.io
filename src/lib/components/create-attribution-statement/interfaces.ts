export enum FormItemType {
	textInput = 'textInput',
	radioButton = 'radioButton',
	checkbox = 'checkbox'
}

export enum AttributionType {
	PROPORTIONS_OF_CONTRIBUTIONS = 'proportions-of-contributions',
	AI_CONTRIBUTION = 'ai-contribution',
	AI_INITIATIVE = 'ai-initiative',
	HUMAN_REVIEW = 'human-review',
	MODEL = 'model'
}

export interface StatementOption {
	option: string;
	tooltipDescription?: string;
}

export interface FormItemI {
	id: number;
	isItemOpen: boolean;
	isItemDisabled: boolean;
	attributionType: AttributionType;
	text: string;
	typeOfItem: FormItemType;
	options: StatementOption[];
	selectedOptions: string[];
	tooltipDescription?: string;
}
