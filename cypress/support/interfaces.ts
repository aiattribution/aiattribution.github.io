import { type AttributionType } from '../../src/lib/components/create-attribution-statement/interfaces';
import { type TagI } from '../../src/lib/models/tag-library';

export interface TagsWithAttributionType {
	attributionType: AttributionType;
	tags: TagI[];
}
