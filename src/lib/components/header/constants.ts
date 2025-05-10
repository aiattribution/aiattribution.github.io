import { HeaderNavType, type HeaderNavItemI } from './interfaces';

export const HEADER_NAV_ITEM_HOME: HeaderNavItemI = {
	id: 0,
	text: HeaderNavType.HOME,
	route: '/'
};

export const HEADER_NAV_ITEM_CREATE_ATTRIBUTION: HeaderNavItemI = {
	id: 1,
	text: HeaderNavType.CREATE_ATTRIBUTION,
	route: '/create_attribution'
};

export const HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION: HeaderNavItemI = {
	id: 2,
	text: HeaderNavType.INTERPRET_ATTRIBUTION,
	route: '/interpret_attribution'
};

export const HEADER_NAV_ITEMS: HeaderNavItemI[] = [
	HEADER_NAV_ITEM_HOME,
	HEADER_NAV_ITEM_CREATE_ATTRIBUTION,
	HEADER_NAV_ITEM_INTERPRET_ATTRIBUTION
];
