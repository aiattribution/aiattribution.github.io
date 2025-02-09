<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { AIUsageOptions } from '$lib/models/tag-library';
	import {
		AI_USED,
		AIA,
		NO_AI_USED_ABBREVIATED_STATEMENT,
		NO_AI_USED_FULL_STATEMENT,
		VERSION
	} from './constants';
	import { type FormItemI } from './interfaces';

	export let attibutionFormItems: FormItemI[];

	const getConcatenatedOptionsAbbreviatedStatement = (options: string[]): string => {
		return options
			.map((option: string) => {
				return option
					.split(' ')
					.map((word: string) => word[0])
					.join('');
			})
			.join('');
	};

	const getConcatenatedOptionsFullStatement = (options: string[]): string => {
		return options
			.map((option: string) => {
				return `, ${option}`;
			})
			.join('');
	};

	const getAbbreviatedStatement = (): string => {
		let abbreviatedStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean =
			attibutionFormItems[0].selectedOptions[0] === AIUsageOptions.YES;
		if (attibutionFormItems[1].selectedOptions[0] && isAIUsageOptionYes) {
			aiUsed = attibutionFormItems[1].selectedOptions[0];
		} else if (isAIUsageOptionYes) {
			aiUsed = AI_USED;
		} else {
			aiUsed = NO_AI_USED_ABBREVIATED_STATEMENT;
		}
		const aiContributions: string = getConcatenatedOptionsAbbreviatedStatement(
			attibutionFormItems[2].selectedOptions
		);
		if (isAIUsageOptionYes) {
			abbreviatedStatement = `${AIA} ${aiUsed} ${aiContributions} ${VERSION}`;
		} else {
			abbreviatedStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return abbreviatedStatement;
	};

	const getFullStatement = (): string => {
		let fullStatement: string = '';
		let aiUsed: string = '';
		const isAIUsageOptionYes: boolean =
			attibutionFormItems[0].selectedOptions[0] === AIUsageOptions.YES;
		if (attibutionFormItems[1].selectedOptions[0] && isAIUsageOptionYes) {
			aiUsed = attibutionFormItems[1].selectedOptions[0];
		} else if (isAIUsageOptionYes) {
			aiUsed = AI_USED;
		} else {
			aiUsed = NO_AI_USED_FULL_STATEMENT;
		}
		const aiContributions: string = getConcatenatedOptionsFullStatement(
			attibutionFormItems[2].selectedOptions
		);
		if (isAIUsageOptionYes) {
			fullStatement = `${AIA} ${aiUsed}${aiContributions} ${VERSION}`;
		} else {
			fullStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return fullStatement;
	};
</script>

<h2 class="recommended-attribution-title">Recommended attribution</h2>

{#if attibutionFormItems[0].selectedOptions[0]}
	<div class="recommended-attribution-item-container">
		<div class="recommended-attribution-item-label">
			<p>Abbreviated statement</p>
		</div>
		<div class="recommended-attribution-item">
			<div class="recommended-attribution-item-text-container">
				<p class="recommended-attribution-item-text">{getAbbreviatedStatement()}</p>
			</div>
			<div>
				<Button kind="ghost" iconDescription="Copy" icon={Copy} on:click={() => {}} />
			</div>
			<div>
				<Button kind="ghost" iconDescription="Download" icon={Download} on:click={() => {}} />
			</div>
		</div>
	</div>

	<div class="recommended-attribution-item-container">
		<div class="recommended-attribution-item-label">
			<p>Full statement</p>
		</div>
		<div class="recommended-attribution-item">
			<div class="recommended-attribution-item-text-container">
				<p class="recommended-attribution-item-text">{getFullStatement()}</p>
			</div>
			<div>
				<Button kind="ghost" iconDescription="Copy" icon={Copy} on:click={() => {}} />
			</div>
			<div>
				<Button kind="ghost" iconDescription="Download" icon={Download} on:click={() => {}} />
			</div>
		</div>
	</div>

	<div class="attribution-tag-label">
		This attribution tag indicates that AI was used to create this content.
	</div>
{/if}

<style lang="scss">
	.recommended-attribution-title {
		font-family: IBM Plex Sans;
		font-weight: 700;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0px;
	}

	.recommended-attribution-item-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.recommended-attribution-item-label {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 14px;
		line-height: 18px;
		letter-spacing: 0.16px;
		color: #525252;
	}

	.recommended-attribution-item {
		display: flex;
		align-items: center;
		width: 100%;
		height: 48px;
		background-color: var(--cds-ui-02);
	}

	.recommended-attribution-item-text-container {
		flex-grow: 1;
		margin-left: 10.5px;
	}

	.recommended-attribution-item-text {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
	}

	.attribution-tag-label {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.32px;
	}
</style>
