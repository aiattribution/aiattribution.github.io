export interface UserLocationPayload {
	latitude: string;
	longitude: string;
}

export interface UpdateCopyActionsPayload {
	includeNumberOfActionsOnAbbreviatedStatements: boolean;
	includeNumberOfActionsOnFullStatements: boolean;
	statementDisplayed: string;
	fieldsFilledOut: string[];
	fieldsLeftBlank: string[];
	optionsSelectedPerField: Record<string, string[]>;
}
