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
				2 +
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
				-2 -
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
				8;
		}
		return leftPosition;
	};

	const getAttributionIconsExplanationLeftPosition = (): number => {
		let leftPosition: number = 0;
		if (attributionIconsElement && attributionIconsExplanationElement) {
			leftPosition =
				-2 -
				attributionIconsExplanationElement.getBoundingClientRect().width / 2 +
				attributionIconsElement.getBoundingClientRect().width / 2;
		}
		return leftPosition;
	};
</script>

<div class="statement-components-container">
	<div bind:this={statementComponentTextElement} class="statement-component-text">
		<div class="statement-component-explanations-container">
			<div
				bind:this={attributionIdentifierExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionIdentifierExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">AI Attribution <br /> identifier</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionWhatDidAIContributeExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionWhatDidAIContributeExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">What did AI <br /> contribute?</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionWasAIContentReviewedByAHumanExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionWasAIContentReviewedByAHumanExplanationLeftPosition}px;`}
			>
				<span class="statement-component-explanation-text">
					Was AI content <br /> reviewed by a human?
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
		<span bind:this={attributionHowMuchDidAIContributeElement} class="border-bottom">
			Primarily AI
		</span><span>,</span>
		<span bind:this={attributionWhatDidAIContributeElement} class="border-top">
			New content
		</span><span>,</span>
		<span bind:this={attributionWhoInitiatedTheWorkElement} class="border-bottom">
			Human-initiated
		</span><span>,</span>
		<span bind:this={attributionWasAIContentReviewedByAHumanElement} class="border-top">
			Reviewed
		</span><span>,</span>
		<span bind:this={attributionAIApplicationUsedElement} class="border-bottom"> DALL-E </span>
		<span bind:this={attributionAIVersionNumberElement} class="border-top">v1.0</span>

		<div class="statement-component-explanations-container">
			<div
				bind:this={attributionHowMuchDidAIContributeExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionHowMuchDidAIContributeExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">How much did AI <br /> contribute?</span>
			</div>

			<div
				bind:this={attributionWhoInitiatedTheWorkExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionWhoInitiatedTheWorkExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">Who initiated <br /> the work?</span>
			</div>

			<div
				bind:this={attributionAIApplicationUsedExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${attributionAIApplicationUsedExplanationLeftPosition}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">AI application <br /> used</span>
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
		text-align: center;
		color: #4589ff;
	}

	.vertical-line {
		width: 2px;
		height: 32px;
		background-color: #4589ff;
	}

	.vertical-line-margin-top {
		margin-top: 8px;
	}

	.vertical-line-margin-bottom {
		margin-bottom: 8px;
	}

	.border-top {
		border-top: 2px solid #4589ff;
	}

	.border-bottom {
		border-bottom: 2px solid #4589ff;
	}

	.statement-component-icons-container {
		.statement-component-icons-internal-container {
			display: flex;
			width: fit-content;
			padding: 4.25px 0;
			margin-bottom: -2px;
			gap: 0.5rem;
			border-bottom: 2px solid #4589ff;
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
			:global(svg) {
				width: 20px;
				height: 20px;
			}
		}

		.statement-component-explanation-text {
			font-size: type.type-scale(2) !important;
			line-height: 20px !important;
		}
	}
</style>
