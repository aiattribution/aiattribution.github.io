export enum AIUsageOptions {
	YES = 'Yes',
	NO = 'No'
}

export enum AIContributionOptions {
	STYLISTIC_EDITS = 'Stylistic edits',
	CONTENT_EDITS = 'Content edits',
	NEW_CONTENT = 'New content'
}

export enum AIProportionOptions {
	ENTIRELY_AI_GENERATED = 'Entirely AI-generated',
	PRIMARILY_AI_GENERATED = 'Primarily AI-generated',
	HUMAN_AI_BLEND = 'Human-AI blend',
	PRIMARILY_HUMAN_CREATED = 'Primarily human-created'
}

export enum AIInitiativeOptions {
	AI_WAS_PROMPTED = 'AI was prompted',
	AI_PROACTIVELY_SUGGESTED = 'AI proactively made suggestions'
}

export enum HumanReviewOptions {
	REVIEWED_AND_APPROVED = 'AI-generated content was reviewed and approved',
	NOT_REVIEWED = 'AI generated content was not reviewed'
}

export interface TagI {
	selection: string;
	icon: string;
	abbreviation: string;
	name: string;
	explanation: string;
}
