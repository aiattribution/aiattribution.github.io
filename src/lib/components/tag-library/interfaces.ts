import type { TagI } from '$lib/models/tag-library';

export interface AttributionTagI {
	id: number;
	name: string;
	tags: TagI[];
}
