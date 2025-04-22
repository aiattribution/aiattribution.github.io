export interface UpdateStatementActionsPayload {
	includeNumberOfActionsOnAbbreviatedStatements: boolean;
	includeNumberOfActionsOnFullStatements: boolean;
	statementDisplayed: string;
	fieldsFilledOut: string[];
	fieldsLeftBlank: string[];
	optionsSelectedPerField: Record<string, string[]>;
}
