import { trackEvent } from '@lukulent/svelte-umami';
import type { UpdateStatementActionsPayload } from './interfaces';

class ApiService {
	constructor() {}

	public updateEventMetric(eventName: string, payload: UpdateStatementActionsPayload): void {
		trackEvent(eventName, { ...payload });
	}
}

export default new ApiService();
