import { HeaderNavType, type HeaderNavItemI } from './interfaces';

export const HEADER_NAV_ITEMS: HeaderNavItemI[] = [
	{
		id: 0,
		text: HeaderNavType.ATTRIBUTION_STATEMENT,
		isSelected: true
	},
	{
		id: 1,
		text: HeaderNavType.ABOUT,
		isSelected: false
	}
];
