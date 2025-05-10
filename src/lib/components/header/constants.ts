import { HeaderNavType, type HeaderNavItemI } from './interfaces';

export const HEADER_NAV_ITEMS: HeaderNavItemI[] = [
	{
		id: 0,
		text: HeaderNavType.HOME,
		route: '/'
	},
	{
		id: 1,
		text: HeaderNavType.CREATE_ATTRIBUTION,
		route: '/create_attribution'
	},
	{
		id: 2,
		text: HeaderNavType.INTERPRET_ATTRIBUTION,
		route: '/interpret_attribution'
	}
];
