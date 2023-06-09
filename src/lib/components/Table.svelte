<script lang="ts">
	import Icon from '@iconify/svelte';
	import { DataHandler, Datatable, Th } from '@vincjo/datatables';
	import { modal } from 'gros/modal';
	import Delete from './Modals/ModalDelete.svelte';

	interface Rows {
		name: string;
		value: string;
	}

	export let onDelete: (id: number) => void;
	export let data: any[];
	export let rows: Rows[];
	const handler = new DataHandler(data, {
		rowsPerPage: 10,
		i18n: {
			search: 'Buscar...',
			show: 'Mostrar',
			entries: 'documentos',
			filter: 'Filtrar',
			rowCount: 'Mostrando {start} a {end} de {total} documentos',
			noRows: 'Sem resultados',
			previous: 'Anterior',
			next: 'Próximo'
		}
	});
	const rowsShow = handler.getRows();

	$: {
		handler.setRows(data);
	}
</script>

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				{#each rows as head}
					<Th {handler} orderBy={head.value}>{head.name}</Th>
				{/each}
				<Th {handler} />
			</tr>
		</thead>
		<tbody>
			{#each $rowsShow as row}
				<tr>
					{#each rows as head}
						<td>{row[head.value]}</td>
					{/each}
					<td>
						<button
							class="btn"
							on:click={() => modal.open(Delete, { type: 'entrada', onDelete: onDelete, row })}
						>
							<i class="micon">delete_forever</i>
						</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Datatable>

<style lang="scss">
	thead {
		background: #fff;
	}
	tbody td {
		border: 1px solid #f5f5f5;
		padding: 4px 20px;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tbody tr:hover {
		background: #f5f5f5;
	}

	button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 32px;
		height: 32px;
		margin: auto;
		border-radius: 50%;
		background: transparent;
		color: rgb(150, 0, 0);
		border: 1px solid rgb(150, 0, 0);
		font-size: 20px;

		&:hover {
			background-color: #ffe2e2;
		}
	}
</style>
