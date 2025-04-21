<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CertifiedReviewIcon,
		HumanInitiatedIcon,
		NewContentIcon,
		PrimarilyAIIcon
	} from '../icons/tag-icons';

	let statementComponentTextElement: HTMLDivElement = null;

	let attributionIdentifierElement: HTMLSpanElement = null;
	let attributionIdentifierExplanationElement: HTMLDivElement = null;

	let attributionHowMuchDidAIContributeElement: HTMLSpanElement = null;
	let attributionHowMuchDidAIContributeExplanationElement: HTMLDivElement = null;

	let attributionWhatDidAIContributeElement: HTMLSpanElement = null;
	let attributionWhatDidAIContributeExplanationElement: HTMLDivElement = null;

	let attributionWhoInitiatedTheWorkElement: HTMLSpanElement = null;
	let attributionWhoInitiatedTheWorkExplanationElement: HTMLDivElement = null;

	let attributionWasAIContentReviewedByAHumanElement: HTMLSpanElement = null;
	let attributionWasAIContentReviewedByAHumanExplanationElement: HTMLDivElement = null;

	let attributionAIApplicationUsedElement: HTMLSpanElement = null;
	let attributionAIApplicationUsedExplanationElement: HTMLDivElement = null;

	let attributionAIVersionNumberElement: HTMLSpanElement = null;
	let attributionAIVersionNumberExplanationElement: HTMLDivElement = null;

	let attributionIconsElement: HTMLDivElement = null;
	let attributionIconsExplanationElement: HTMLDivElement = null;

	let attributionIdentifierExplanationLeftPosition: number = 0;
	let attributionHowMuchDidAIContributeExplanationLeftPosition: number = 0;
	let attributionWhatDidAIContributeExplanationLeftPosition: number = 0;
	let attributionWhoInitiatedTheWorkExplanationLeftPosition: number = 0;
	let attributionWasAIContentReviewedByAHumanExplanationLeftPosition: number = 0;
	let attributionAIApplicationUsedExplanationLeftPosition: number = 0;
	let attributionAIVersionNumberExplanationLeftPosition: number = 0;
	let attributionIconsExplanationLeftPosition: number = 0;
	let statementComponentIconsContainerLeftPosition: number = 0;

	let isMobile: boolean = false;
	let linesWidth: number = 2;

	onMount(() => {
		updateStatementComponentExplanationsPositions();
		window.addEventListener('resize', updateStatementComponentExplanationsPositions);

		return () => {
			window.removeEventListener('resize', updateStatementComponentExplanationsPositions);
		};
	});

	const updateStatementComponentExplanationsPositions = (): void => {
		attributionIdentifierExplanationLeftPosition =
			getAttributionIdentifierExplanationLeftPosition();
		attributionHowMuchDidAIContributeExplanationLeftPosition =
			getAttributionHowMuchDidAIContributeExplanationLeftPosition();
		attributionWhatDidAIContributeExplanationLeftPosition =
			getAttributionWhatDidAIContributeExplanationLeftPosition();
		attributionWhoInitiatedTheWorkExplanationLeftPosition =
			getAttributionWhoInitiatedTheWorkExplanationLeftPosition();
		attributionWasAIContentReviewedByAHumanExplanationLeftPosition =
			getAttributionWasAIContentReviewedByAHumanExplanationLeftPosition();
		attributionAIApplicationUsedExplanationLeftPosition =
			getAttributionAIApplicationUsedExplanationLeftPosition();
		attributionAIVersionNumberExplanationLeftPosition =
			getAttributionAIVersionNumberExplanationLeftPosition();
		attributionIconsExplanationLeftPosition = getAttributionIconsExplanationLeftPosition();
		statementComponentIconsContainerLeftPosition =
			getStatementComponentIconsContainerLeftPosition();

		isMobile = window.matchMedia('(max-width: 768px)').matches;
		linesWidth = isMobile ? 1 : 2;
	};

	const getSpanRelativeOffsetXWithinStatementComponentTextElement = (
		spanElement: HTMLSpanElement
	) => {
		return (
			spanElement.getBoundingClientRect().left -
			statementComponentTextElement.getBoundingClientRect().left
		);
	};

	const getStatementComponentExplanationLeftPosition = (
		spanStatementComponentElement: HTMLSpanElement,
		spanStatementComponentExplanationElement: HTMLSpanElement
	): number => {
		let leftPosition: number = 0;
		if (spanStatementComponentElement && spanStatementComponentExplanationElement) {
			leftPosition =
				linesWidth +
				getSpanRelativeOffsetXWithinStatementComponentTextElement(spanStatementComponentElement) +
				spanStatementComponentElement.getBoundingClientRect().width / 2 -
				spanStatementComponentExplanationElement.getBoundingClientRect().width / 2;
		}
		return leftPosition;
	};

	const getAttributionIdentifierExplanationLeftPosition = (): number => {
		let leftPosition: number = 0;
		if (attributionIdentifierElement && attributionIdentifierExplanationElement) {
			leftPosition =
				-linesWidth -
				attributionIdentifierExplanationElement.getBoundingClientRect().width / 2 +
				attributionIdentifierElement.getBoundingClientRect().width / 2;
		}
		return leftPosition;
	};

	const getAttributionHowMuchDidAIContributeExplanationLeftPosition = (): number => {
		return getStatementComponentExplanationLeftPosition(
			attributionHowMuchDidAIContributeElement,
			attributionHowMuchDidAIContributeExplanationElement
		);
	};

	const getAttributionWhatDidAIContributeExplanationLeftPosition = (): number => {
		return getStatementComponentExplanationLeftPosition(
			attributionWhatDidAIContributeElement,
			attributionWhatDidAIContributeExplanationElement
		);
	};

	const getAttributionWhoInitiatedTheWorkExplanationLeftPosition = (): number => {
		return getStatementComponentExplanationLeftPosition(
			attributionWhoInitiatedTheWorkElement,
			attributionWhoInitiatedTheWorkExplanationElement
		);
	};

	const getAttributionWasAIContentReviewedByAHumanExplanationLeftPosition = (): number => {
		return getStatementComponentExplanationLeftPosition(
			attributionWasAIContentReviewedByAHumanElement,
			attributionWasAIContentReviewedByAHumanExplanationElement
		);
	};

	const getAttributionAIApplicationUsedExplanationLeftPosition = (): number => {
		return getStatementComponentExplanationLeftPosition(
			attributionAIApplicationUsedElement,
			attributionAIApplicationUsedExplanationElement
		);
	};

	const getAttributionAIVersionNumberExplanationLeftPosition = (): number => {
		return getStatementComponentExplanationLeftPosition(
			attributionAIVersionNumberElement,
			attributionAIVersionNumberExplanationElement
		);
	};

	const getStatementComponentIconsContainerLeftPosition = (): number => {
		let leftPosition: number = 0;
		if (attributionAIVersionNumberElement && attributionAIVersionNumberExplanationElement) {
			leftPosition =
				attributionAIVersionNumberElement.getBoundingClientRect().width / 2 -
				attributionAIVersionNumberExplanationElement.getBoundingClientRect().width / 2 +
				24;
		}
		return leftPosition;
	};

	const getAttributionIconsExplanationLeftPosition = (): number => {
		let leftPosition: number = 0;
		if (attributionIconsElement && attributionIconsExplanationElement) {
			leftPosition =
				-linesWidth -
				attributionIconsExplanationElement.getBoundingClientRect().width / 2 +
				attributionIconsElement.getBoundingClientRect().width / 2;
		}
		return leftPosition;
	};
</script>

<div class="statement-components-container" style={`--line-width: ${linesWidth}px;`}>
	<div bind:this={statementComponentTextElement} class="statement-component-text">
		<div class="statement-component-explanations-container">
			<div
				bind:this={attributionIdentifierExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionIdentifierExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">
					AI Attribution <br /> identifier
				</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionWhatDidAIContributeExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionWhatDidAIContributeExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">
					What did AI <br /> contribute?
				</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionWasAIContentReviewedByAHumanExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionWasAIContentReviewedByAHumanExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">
					Was AI content <br /> reviewed by a <br /> human?
				</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionAIVersionNumberExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionAIVersionNumberExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">
					AI Attribution <br /> version number
				</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>
		</div>

		<span bind:this={attributionIdentifierElement} class="border-top"> AIA </span>
		<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
		<span bind:this={attributionHowMuchDidAIContributeElement} class="border-bottom">
			PAI
		</span><span>,</span>
		<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
		<span bind:this={attributionWhatDidAIContributeElement} class="border-top"> Nc </span><span
			>,</span
		>
		<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
		<span bind:this={attributionWhoInitiatedTheWorkElement} class="border-bottom"> Hin </span><span
			>,</span
		>
		<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
		<span bind:this={attributionWasAIContentReviewedByAHumanElement} class="border-top">
			R
		</span><span>,</span>
		<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
		<span bind:this={attributionAIApplicationUsedElement} class="border-bottom"> DALL-E </span>
		<span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span>
		<span bind:this={attributionAIVersionNumberElement} class="border-top">v1.0</span>

		<div class="statement-component-explanations-container">
			<div
				bind:this={attributionHowMuchDidAIContributeExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionHowMuchDidAIContributeExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">
					How much did AI <br /> contribute?
				</span>
			</div>

			<div
				bind:this={attributionWhoInitiatedTheWorkExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionWhoInitiatedTheWorkExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">
					Who initiated <br /> the work?
				</span>
			</div>

			<div
				bind:this={attributionAIApplicationUsedExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionAIApplicationUsedExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">
					AI application <br /> used
				</span>
			</div>
		</div>
	</div>
	<div
		class="statement-component-icons-container"
		style={`margin-left: ${statementComponentIconsContainerLeftPosition}px;`}
	>
		<div bind:this={attributionIconsElement} class="statement-component-icons-internal-container">
			<PrimarilyAIIcon />
			<NewContentIcon />
			<HumanInitiatedIcon />
			<CertifiedReviewIcon />
		</div>
		<div class="statement-component-explanations-container">
			<div
				bind:this={attributionIconsExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionIconsExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">
					Icons corresponding to <br /> statement components
				</span>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '@carbon/type';

	.statement-components-container {
		display: flex;
		justify-content: center;
		align-items: end;
	}

	.statement-component-text {
		@include type.type-style('productive-heading-04');
	}

	.statement-component-explanations-container {
		display: grid;
	}

	.statement-component-explanation-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: fit-content;
		grid-column: 1;
		grid-row: 1;
	}

	.statement-component-explanation-text {
		font-weight: 600;
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0px;
		text-align: justify;
		color: #4589ff;
	}

	.vertical-line {
		width: var(--line-width);
		min-height: calc(16 * var(--line-width));
		height: 100%;
		background-color: #4589ff;
	}

	.vertical-line-margin-top {
		margin-top: calc(4 * var(--line-width));
	}

	.vertical-line-margin-bottom {
		margin-bottom: calc(4 * var(--line-width));
	}

	.border-top {
		border-top: var(--line-width) solid #4589ff;
	}

	.border-bottom {
		border-bottom: var(--line-width) solid #4589ff;
	}

	.statement-component-icons-container {
		.statement-component-icons-internal-container {
			display: flex;
			width: fit-content;
			padding: 4px 0;
			margin-bottom: -2px;
			gap: 0.5rem;
			border-bottom: var(--line-width) solid #4589ff;
		}

		:global(svg) {
			width: 28px;
			height: 28px;
		}
	}

	@media (max-width: 1262px) {
		.statement-component-text {
			@include type.type-style('productive-heading-03');
		}

		.statement-component-icons-container {
			.statement-component-icons-internal-container {
				padding: 3px 0;
				margin-bottom: -1px;
			}

			:global(svg) {
				width: 20px;
				height: 20px;
			}
		}

		.statement-component-explanation-text {
			font-size: type.type-scale(2);
			line-height: 20px;
		}
	}

	@media (max-width: 1055px) {
		.statement-component-text {
			@include type.type-style('productive-heading-02');
		}

		.statement-component-icons-container {
			.statement-component-icons-internal-container {
				padding: 2.5px 0;
			}

			:global(svg) {
				width: 16px;
				height: 16px;
			}
		}

		.statement-component-explanation-text {
			font-size: type.type-scale(1);
			line-height: 16px;
		}
	}

	@media (max-width: 768px) {
		.statement-component-text {
			@include type.type-style('productive-heading-01');
		}

		.statement-component-icons-container {
			.statement-component-icons-internal-container {
				padding: 2.25px 0;
			}

			:global(svg) {
				width: 14px;
				height: 14px;
			}
		}

		.statement-component-explanation-text {
			font-size: 8px;
			line-height: 12px;
		}
	}

	@media (max-width: 672px) {
		.statement-component-text {
			font-size: type.type-scale(1);
		}

		.statement-component-icons-container {
			.statement-component-icons-internal-container {
				padding: 2px 0;
			}

			:global(svg) {
				width: 12px;
				height: 12px;
			}
		}

		.statement-component-explanation-text {
			font-size: 6px;
			line-height: 10px;
		}
	}

	@media (max-width: 564px) {
		.statement-component-text {
			font-size: 8px;
		}

		.statement-component-icons-container {
			margin-left: 0 !important;

			.statement-component-icons-internal-container {
				padding: 1px 0;
				gap: 0.25rem;
			}

			:global(svg) {
				width: 8px;
				height: 8px;
			}
		}

		.statement-component-explanation-text {
			font-size: 4px;
			line-height: 8px;
		}
	}
</style>
