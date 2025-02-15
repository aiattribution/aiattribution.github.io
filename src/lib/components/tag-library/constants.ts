import {
	AI_CONTRIBUTIONS_TAGS,
	AI_INITIATIVE_TAGS,
	HUMAN_REVIEW_TAGS,
	PROPORTIONS_OF_CONTRIBUTIONS_TAGS
} from '$lib/common/constants';
import type { AttributionTagI } from './interfaces';

export const ATTRIBUTION_TAGS: AttributionTagI[] = [
	{
		id: 0,
		name: 'AI contributions',
		tags: AI_CONTRIBUTIONS_TAGS
	},
	{
		id: 1,
		name: 'Proportion of contributions',
		tags: PROPORTIONS_OF_CONTRIBUTIONS_TAGS
	},
	{
		id: 2,
		name: 'Initiative',
		tags: AI_INITIATIVE_TAGS
	},
	{
		id: 3,
		name: 'Human review',
		tags: HUMAN_REVIEW_TAGS
	}
];
