<script lang="ts">
	let statementComponentTextElement: HTMLDivElement = null;

	let attributionIdentifierElement: HTMLSpanElement = null;

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
		if (attributionIdentifierElement) {
			leftPosition = -2 - attributionIdentifierElement.getBoundingClientRect().width / 2;
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
</script>

<div class="recommended-attribution-item-text-container">
	<div bind:this={statementComponentTextElement} class="statement-component-text">
		<div class="statement-component-explanations-container">
			<div
				class="statement-component-explanation-container"
				style={`margin-left: ${getAttributionIdentifierExplanationLeftPosition()}px;`}
			>
				<span class="statement-component-explanation-text">AI Attribution <br /> identifier</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionWhatDidAIContributeExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${getAttributionWhatDidAIContributeExplanationLeftPosition()}px;`}
			>
				<span class="statement-component-explanation-text">What did AI <br /> contribute?</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionWasAIContentReviewedByAHumanExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${getAttributionWasAIContentReviewedByAHumanExplanationLeftPosition()}px;`}
			>
				<span class="statement-component-explanation-text">
					Was AI content <br /> reviewed by a human?
				</span>
				<span class="vertical-line vertical-line-margin-top"></span>
			</div>

			<div
				bind:this={attributionAIVersionNumberExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${getAttributionAIVersionNumberExplanationLeftPosition()}px;`}
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
				style={`margin-left: ${getAttributionHowMuchDidAIContributeExplanationLeftPosition()}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">How much did AI <br /> contribute?</span>
			</div>

			<div
				bind:this={attributionWhoInitiatedTheWorkExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${getAttributionWhoInitiatedTheWorkExplanationLeftPosition()}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">Who initiated <br /> the work?</span>
			</div>

			<div
				bind:this={attributionAIApplicationUsedExplanationElement}
				class="statement-component-explanation-container"
				style={`margin-left: ${getAttributionAIApplicationUsedExplanationLeftPosition()}px;`}
			>
				<span class="vertical-line vertical-line-margin-bottom"></span>
				<span class="statement-component-explanation-text">AI application <br /> used</span>
			</div>
		</div>
	</div>
	<div class="recommended-attribution-item-icons-container"></div>
</div>

<style lang="scss">
	@use '@carbon/type';

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
</style>
