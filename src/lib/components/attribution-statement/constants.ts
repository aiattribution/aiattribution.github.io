import { FormItemType, type FormItemI } from './interfaces';

export const ATTRIBUTION_FORM_ITEMS: FormItemI[] = [
	{
		id: 1,
		text: 'Was AI used to create this content?',
		type: FormItemType.radioButton,
		options: ['Yes', 'No']
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
		options: ['Stylistic edits', 'Content edits', 'New content']
	},
	{
		id: 4,
		text: 'Proportion of work created or modified by AI',
		type: FormItemType.radioButton,
		options: [
			'Entirely AI-generated',
			'Primarily AI-generated',
			'Human-AI blend',
			'Primarily human-created'
		]
	},
	{
		id: 5,
		text: 'AI initiative',
		type: FormItemType.checkbox,
		options: ['AI was prompted', 'AI proactively made suggestions']
	},
	{
		id: 6,
		text: 'Human review',
		type: FormItemType.radioButton,
		options: [
			'AI-generated content was reviewed and approved',
			'AI generated content was not reviewed'
		]
	}
];
