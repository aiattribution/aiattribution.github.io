export enum FormItemType {
	textInput = 'textInput',
	radioButton = 'radioButton',
	checkbox = 'checkbox'
}

export enum AttributionType {
	AI_USED = 'ai-used',
	MODEL = 'model',
	AI_CONTRIBUTION = 'ai-contribution',
	PROPORTIONS_OF_CONTRIBUTIONS = 'proportions-of-contributions',
	AI_INITIATIVE = 'ai-initiative',
	HUMAN_REVIEW = 'human-review'
}

export interface FormItemI {
	id: number;
	attributionType: AttributionType;
	text: string;
	typeOfItem: FormItemType;
	options: string[];
	selectedOptions: string[];
}
