<script lang="ts">
	import type { AttributionTagI } from './interfaces';

	export let attributionTag: AttributionTagI;
</script>

<div class="attribution-tag-container">
	<h2 class="attribution-tag-title">{attributionTag.name}</h2>
	<table class="attribution-tag-table">
		<tbody>
			<tr class="row">
				<td class="row-label">Selection</td>
				{#each attributionTag.tags as tag}
					<td class="text-cell">{tag.selection}</td>
				{/each}
			</tr>
			<tr class="row">
				<td class="row-label">Icon</td>
				{#each attributionTag.tags as tag}
					<td><img src={tag.icon} alt={tag.selection} width="24" height="24" /></td>
				{/each}
			</tr>
			<tr class="row">
				<td class="row-label">Abbreviation</td>
				{#each attributionTag.tags as tag}
					<td class="text-cell">{tag.abbreviation}</td>
				{/each}
			</tr>
			<tr class="row">
				<td class="row-label">Name</td>
				{#each attributionTag.tags as tag}
					<td class="text-cell">{tag.name}</td>
				{/each}
			</tr>
			<tr class="row">
				<td class="row-label">Explanation</td>
				{#each attributionTag.tags as tag}
					<td class="text-cell">{tag.explanation}</td>
				{/each}
			</tr>
		</tbody>
	</table>
</div>

<style lang="scss">
	.attribution-tag-container {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.attribution-tag-title {
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 20px;
		line-height: 28px;
		letter-spacing: 0px;
	}

	.attribution-tag-table {
		width: fit-content;
		table-layout: auto;
	}

	.row-label {
		white-space: nowrap;
		width: 1px;
		text-align: left;
	}

	.row:not(:last-child) {
		border-bottom: 0.25px solid #000000;
	}

	.row td {
		padding: 8px 0px;
		padding-right: 2rem;
	}

	.row:first-child .text-cell {
		white-space: nowrap;
	}

	.row-label {
		vertical-align: top;
		font-family: IBM Plex Sans;
		font-weight: 700;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.32px;
	}

	.text-cell {
		width: 1px;
		font-family: IBM Plex Sans;
		font-weight: 400;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: 0.32px;
	}
</style>
