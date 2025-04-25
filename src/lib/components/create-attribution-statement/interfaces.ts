import { z } from 'zod';

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

const StatementOptionSchema = z.object({
	option: z.string(),
	tooltipDescription: z.string().optional()
});

const FormItemISchema = z.object({
	id: z.number(),
	isItemOpen: z.boolean(),
	isItemDisabled: z.boolean(),
	attributionType: z.enum([
		AttributionType.PROPORTIONS_OF_CONTRIBUTIONS,
		AttributionType.AI_CONTRIBUTION,
		AttributionType.AI_INITIATIVE,
		AttributionType.HUMAN_REVIEW,
		AttributionType.MODEL
	]),
	text: z.string(),
	typeOfItem: z.enum([FormItemType.textInput, FormItemType.radioButton, FormItemType.checkbox]),
	options: z.array(StatementOptionSchema),
	selectedOptions: z.array(z.string()),
	tooltipDescription: z.string().optional()
});

export const FormItemIArraySchema = z.array(FormItemISchema);
