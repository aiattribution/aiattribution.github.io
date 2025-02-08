<script lang="ts">
	import { Header, HeaderNav, HeaderNavItem } from 'carbon-components-svelte';
	import { APP_TITLE } from '$lib/common/constants';
	import { HEADER_NAV_ITEMS } from './constants';
	import type { HeaderNavItemI } from './interfaces';

	let headerNavItems: HeaderNavItemI[] = HEADER_NAV_ITEMS;

	const onHeaderNavItemClick = (headerNavItem: HeaderNavItemI): void => {
		headerNavItems.forEach((value: HeaderNavItemI) => {
			if (value.id === headerNavItem.id) {
				value.isSelected = true;
			} else {
				value.isSelected = false;
			}
		});
		headerNavItems = headerNavItems;
	};
</script>

<Header platformName={APP_TITLE}>
	<HeaderNav>
		{#each headerNavItems as headerNavItem (headerNavItem.id)}
			<HeaderNavItem
				text={headerNavItem.text}
				isSelected={headerNavItem.isSelected}
				on:click={() => {
					onHeaderNavItemClick(headerNavItem);
				}}
			/>
		{/each}
	</HeaderNav>
</Header>

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
</style>
