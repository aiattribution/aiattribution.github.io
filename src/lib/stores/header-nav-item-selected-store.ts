import { goto } from '$app/navigation';
import { HEADER_NAV_ITEM_HOME } from '$lib/components/header/constants';
import type { HeaderNavItemI } from '$lib/components/header/interfaces';
import { writable, type Writable } from 'svelte/store';

const headerNavItemSelected: Writable<HeaderNavItemI> = writable(HEADER_NAV_ITEM_HOME);

export const headerNavItemSelectedStore = {
	subscribe: headerNavItemSelected.subscribe,
	setHeaderNavItemSelected: (itemSelected: HeaderNavItemI, updateRoute: boolean = true) => {
		headerNavItemSelected.update((value: HeaderNavItemI) => {
			value = itemSelected;
			if (updateRoute) {
				goto(itemSelected.route);
			}
			return value;
		});
	}
};
