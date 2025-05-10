import { HEADER_NAV_ITEM_HOME } from '$lib/components/header/constants';
import type { HeaderNavItemI } from '$lib/components/header/interfaces';
import { writable, type Writable } from 'svelte/store';

const headerNavItemSelected: Writable<HeaderNavItemI> = writable(HEADER_NAV_ITEM_HOME);

export const headerNavItemSelectedStore = {
	subscribe: headerNavItemSelected.subscribe,
	setHeaderNavItemSelected: (itemSelected: HeaderNavItemI) => {
		headerNavItemSelected.update((value: HeaderNavItemI) => {
			value = itemSelected;
			return value;
		});
	}
};
