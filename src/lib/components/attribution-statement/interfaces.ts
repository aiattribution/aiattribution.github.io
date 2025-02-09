export enum FormItemType {
	textInput = 'textInput',
	radioButton = 'radioButton',
	checkbox = 'checkbox'
}

export interface FormItemI {
	id: number;
	text: string;
	type: FormItemType;
	options: string[];
	selectedOptions: string[];
}
