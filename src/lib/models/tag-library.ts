import type { Component } from 'svelte';

export enum AIProportionOptions {
	ENTIRELY_AI_GENERATED = 'Entirely AI-generated',
	PRIMARILY_AI_GENERATED = 'Primarily AI-generated',
	HUMAN_AI_BLEND = 'Human-AI blend',
	PRIMARILY_HUMAN_CREATED = 'Primarily human-created',
	ENTIRELY_HUMAN_CREATED = 'Entirely human-created'
}

export enum AIContributionOptions {
	STYLISTIC_EDITS = 'Stylistic edits',
	CONTENT_EDITS = 'Content edits',
	NEW_CONTENT = 'New content'
}

export enum AIInitiativeOptions {
	HUMAN_INITIATED = 'Human-initiated',
	AI_INITIATED = 'AI-initiated'
}

export enum HumanReviewOptions {
	REVIEWED_AND_APPROVED = 'AI-generated content was reviewed and approved',
	NOT_REVIEWED = 'AI generated content was not reviewed'
}

export interface TagI {
	id: string;
	name: string;
	abbreviation: string;
	explanation: string;
	iconComponent?: Component;
}
