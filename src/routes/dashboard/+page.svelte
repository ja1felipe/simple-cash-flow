<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	import Table from '$lib/components/Table.svelte';
	import { entries, removeEntry } from '$lib/stores/entries';
	export let data: PageData;

	entries.set(data.entries!);

	let tabSelected = 0;

	function handleClick(index: number) {
		tabSelected = index;
	}

	$: $entries: {
		console.log($entries);
	}
</script>

<div class="container">
	<section class="content">
		<form method="post" action="/api/logout">
			<button type="submit"
				><span>Sair</span>
				<Icon width="25" icon="tabler:walk" />
			</button>
		</form>
		<div class="data-container">
			<h1>Fluxo de caixa</h1>
			<div style="padding: 10px; display: flex; gap: 5px; flex-direction: column;">
				<div class="tabs">
					<button class:active={tabSelected == 0} on:click={() => handleClick(0)}>
						Entradas
					</button>
					<button class:active={tabSelected == 1} on:click={() => handleClick(1)}> Saídas </button>
					<button style="margin-left: auto;" on:click={() => handleClick(1)}>
						Adicionar {tabSelected == 0 ? 'entrada' : 'saída'}
					</button>
				</div>
				<section style="border: 1px dashed rgb(175, 0, 0); border-radius: 5px;">
					{#if tabSelected == 0}
						<Table onDelete={removeEntry} data={$entries} />
					{:else}
						<Table onDelete={removeEntry} data={data.outflows} />
					{/if}
				</section>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		background-color: white;
		width: 90%;
		padding: 15px;
		gap: 5px;
	}

	.data-container {
		border: 1px solid rgb(122, 127, 142);

		h1 {
			margin: 0;
			background-color: rgb(36, 48, 67);
			color: white;
			padding: 5px;
			font-size: 15px;
			font-weight: normal;
		}
	}

	.tabs {
		display: flex;
		gap: 10px;
		button {
			background-color: transparent;
			color: rgb(175, 0, 0);
			border-radius: 10px;
			font-size: 20px;
			padding: 10px;
			text-align: center;
			cursor: pointer;
			border: 1px dashed rgb(175, 0, 0);
			&:hover {
				opacity: 0.9;
			}
		}
	}

	.active {
		background-color: rgb(234, 235, 235) !important;
		color: rgb(217, 18, 18) !important;
	}

	form {
		align-self: flex-end;

		button {
			border: none;
			background-color: rgb(175, 0, 0);
			color: white;
			font-size: 20px;
			display: flex;
			align-items: center;
			gap: 5px;
			padding: 10px;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
</style>