import { trackEvent } from '@lukulent/svelte-umami';
import type { UpdateStatementActionsPayload } from './interfaces';

class AnalyticsService {
	constructor() {}

	public trackStatementMetric(eventName: string, payload: UpdateStatementActionsPayload): void {
		trackEvent(eventName, { ...payload });
	}

	public trackInterpretStatementMetric(statementToInterpret: string): void {
		trackEvent('button_click_interpret_statement', { userEnteredStatement: statementToInterpret });
	}

	public trackLinkClickMetric(eventName: string): void {
		trackEvent(eventName);
	}
}

export default new AnalyticsService();
