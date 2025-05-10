<script lang="ts">
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		SideNav,
		SideNavItems,
		SideNavLink
	} from 'carbon-components-svelte';
	import { APP_TITLE } from '$lib/common/constants';
	import { headerNavItemSelectedStore } from '$lib/stores';
	import { HEADER_NAV_ITEMS } from './constants';
	import type { HeaderNavItemI } from './interfaces';

	let headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;
	let isSideNavOpen: boolean = false;

	const onHeaderNavItemClick = (headerNavItem: HeaderNavItemI): void => {
		headerNavItemSelectedStore.setHeaderNavItemSelected(headerNavItem);
	};
</script>

<Header platformName={APP_TITLE} bind:isSideNavOpen expandedByDefault={false}>
	<HeaderNav>
		{#each headerNavItems as headerNavItem (headerNavItem.id)}
			<HeaderNavItem
				text={headerNavItem.text}
				isSelected={headerNavItem.text === $headerNavItemSelectedStore.text}
				on:click={() => {
					onHeaderNavItemClick(headerNavItem);
				}}
			/>
		{/each}
	</HeaderNav>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		{#each headerNavItems as headerNavItem (headerNavItem.id)}
			<SideNavLink
				text={headerNavItem.text}
				isSelected={headerNavItem.text === $headerNavItemSelectedStore.text}
				on:click={() => {
					onHeaderNavItemClick(headerNavItem);
				}}
			/>
		{/each}
	</SideNavItems>
</SideNav>

<style lang="scss">
	:global(.bx--header) {
		background: #ffffff !important;
		border-bottom: 1px solid #c6c6c6 !important;
	}

	:global(.bx--header__name) {
		color: var(--cds-text-01) !important;
	}

	:global(.bx--header__nav::before) {
		background-color: #c6c6c6 !important;
	}

	:global(a.bx--header__menu-item) {
		color: var(--cds-text-01) !important;
	}

	:global(a.bx--header__menu-item:hover),
	:global(a.bx--header__menu-item:active) {
		background-color: var(--cds-hover-light-ui) !important;
	}

	:global(a.bx--header__menu-item:focus) {
		border-color: transparent !important;
		border-bottom: 3px solid var(--cds-inverse-support-04) !important;
	}

	:global(.bx--header__menu-toggle svg) {
		fill: black;
	}
</style>
