import { HeaderNavType, type HeaderNavItemI } from './interfaces';

export const HEADER_NAV_ITEMS: HeaderNavItemI[] = [
	{
		id: 0,
		text: HeaderNavType.HOME,
		isSelected: true
	},
	{
		id: 1,
		text: HeaderNavType.CREATE_ATTRIBUTION,
		isSelected: false
	},
	{
		id: 2,
		text: HeaderNavType.INTERPRET_ATTRIBUTION,
		isSelected: false
	}
];
