export enum HeaderNavType {
	HOME = 'Home',
	CREATE_ATTRIBUTION = 'Create attribution',
	INTERPRET_ATTRIBUTION = 'Interpret attribution'
}

export interface HeaderNavItemI {
	id: number;
	text: HeaderNavType;
}
