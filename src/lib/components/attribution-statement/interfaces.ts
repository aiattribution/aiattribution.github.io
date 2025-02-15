export enum FormItemType {
	textInput = 'textInput',
	radioButton = 'radioButton',
	checkbox = 'checkbox'
}

export enum AttributionType {
	PROPORTIONS_OF_CONTRIBUTIONS = 'proportions-of-contributions',
	MODEL = 'model',
	AI_CONTRIBUTION = 'ai-contribution',
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
