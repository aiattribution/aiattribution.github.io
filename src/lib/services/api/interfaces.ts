export interface UpdateStatementActionsPayload {
	statementDisplayed: string;
	fieldsFilledOut: string[];
	fieldsLeftBlank: string[];
	optionsSelectedPerField: Record<string, string[]>;
}
