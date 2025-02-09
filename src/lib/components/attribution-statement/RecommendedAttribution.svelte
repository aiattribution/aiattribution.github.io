<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { Copy, Download } from 'carbon-icons-svelte';
	import { ALL_TAGS } from '$lib/common/constants';
	import { AIUsageOptions, type TagI } from '$lib/models/tag-library';
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
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return tag.abbreviation;
				} else {
					return '';
				}
			})
			.join('');
	};

	const getConcatenatedOptionsFullStatement = (options: string[]): string => {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return `, ${tag.name}`;
				} else {
					return '';
				}
			})
			.join('');
	};

	const getConcatenatedOptionsExplanations = (options: string[]): string => {
		return options
			.map((option: string) => {
				const tag: TagI = ALL_TAGS.find((tag: TagI) => {
					return tag.id === option;
				});
				if (tag) {
					return `${tag.explanation}`;
				} else {
					return '';
				}
			})
			.join(' ');
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

		if (isAIUsageOptionYes) {
			const aiContributions: string = getConcatenatedOptionsAbbreviatedStatement(
				attibutionFormItems[2].selectedOptions
			);
			const proportionOfContribution: string = getConcatenatedOptionsAbbreviatedStatement(
				attibutionFormItems[3].selectedOptions
			);
			const aiInitiatives: string = getConcatenatedOptionsAbbreviatedStatement(
				attibutionFormItems[4].selectedOptions
			);
			const humanReview: string = getConcatenatedOptionsAbbreviatedStatement(
				attibutionFormItems[5].selectedOptions
			);
			abbreviatedStatement = `${AIA} ${aiUsed} ${aiContributions} ${proportionOfContribution} ${aiInitiatives} ${humanReview} ${VERSION}`;
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

		if (isAIUsageOptionYes) {
			const aiContributions: string = getConcatenatedOptionsFullStatement(
				attibutionFormItems[2].selectedOptions
			);
			const proportionOfContribution: string = getConcatenatedOptionsFullStatement(
				attibutionFormItems[3].selectedOptions
			);
			const aiInitiatives: string = getConcatenatedOptionsFullStatement(
				attibutionFormItems[4].selectedOptions
			);
			const humanReview: string = getConcatenatedOptionsFullStatement(
				attibutionFormItems[5].selectedOptions
			);
			fullStatement = `${AIA} ${aiUsed}${aiContributions}${proportionOfContribution}${aiInitiatives}${humanReview} ${VERSION}`;
		} else {
			fullStatement = `${AIA} ${aiUsed} ${VERSION}`;
		}
		return fullStatement;
	};

	const getAttributionTagLabelContent = (): string => {
		let atributionTagLabelContent: string = '';
		let aiUsed: string = '';
		let modelUsed: string = '';
		let aiContributions: string = '';
		let proportionOfContribution: string = '';
		let aiInitiatives: string = '';
		let humanReview: string = '';
		const isAIUsageOptionYes: boolean =
			attibutionFormItems[0].selectedOptions[0] === AIUsageOptions.YES;
		if (isAIUsageOptionYes) {
			aiUsed = 'AI was used';
			if (attibutionFormItems[1].selectedOptions[0]) {
				modelUsed = `with ${attibutionFormItems[1].selectedOptions[0]}`;
			}
			aiContributions = getConcatenatedOptionsExplanations(attibutionFormItems[2].selectedOptions);
			proportionOfContribution = getConcatenatedOptionsExplanations(
				attibutionFormItems[3].selectedOptions
			);
			aiInitiatives = getConcatenatedOptionsExplanations(attibutionFormItems[4].selectedOptions);
			humanReview = getConcatenatedOptionsExplanations(attibutionFormItems[5].selectedOptions);
		} else {
			aiUsed = 'AI was not used in any way';
		}
		atributionTagLabelContent = `This attribution tag indicates that ${aiUsed} to create this content ${modelUsed}. ${aiContributions} ${proportionOfContribution} ${aiInitiatives} ${humanReview}`;
		return atributionTagLabelContent;
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
		{getAttributionTagLabelContent()}
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
