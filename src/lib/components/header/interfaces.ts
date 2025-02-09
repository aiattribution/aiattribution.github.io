export enum HeaderNavType {
	ATTRIBUTION_STATEMENT = 'Attribution statement',
	ABOUT = 'About'
}

export interface HeaderNavItemI {
	id: number;
	text: HeaderNavType;
	isSelected: boolean;
}
