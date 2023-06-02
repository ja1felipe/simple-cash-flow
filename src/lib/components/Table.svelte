<script lang="ts">
	import Icon from '@iconify/svelte';
	import { DataHandler, Datatable, Th } from '@vincjo/datatables';
	export let data;
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
	const rows = handler.getRows();
</script>

<Datatable {handler}>
	<table>
		<thead>
			<tr>
				<Th {handler} orderBy="description">Descrição</Th>
				<Th {handler} orderBy="value">Valor</Th>
				<Th {handler} orderBy="date">Data</Th>
				<Th {handler} orderBy="payment_method">Método de pagamento</Th>
				<Th {handler} />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td>{row.description}</td>
					<td>{row.value}</td>
					<td>{row.date}</td>
					<td>{row.payment_method}</td>
					<td>
						<button class="btn">
							<Icon icon="material-symbols:delete-outline" />
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
