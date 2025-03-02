export interface UserLocationPayload {
	latitude: string;
	longitude: string;
}

export interface UpdateStatementActionsPayload {
	includeNumberOfActionsOnAbbreviatedStatements: boolean;
	includeNumberOfActionsOnFullStatements: boolean;
	statementDisplayed: string;
	fieldsFilledOut: string[];
	fieldsLeftBlank: string[];
	optionsSelectedPerField: Record<string, string[]>;
}
