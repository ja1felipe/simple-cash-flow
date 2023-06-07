<script lang="ts">
	import { Modal } from 'gros/modal';
	export let close: () => void;
	type Props = {
		type: 'entrada' | 'saída';
		onDelete: (...args: any[]) => void;
		row: any;
	};
	export let props: Props;

	let { type, onDelete, row } = props;
</script>

<Modal title="Deletar documento" icon="delete_forever">
	<aside>
		Tem certeza que deseja deletar essa {type} permanentemente?
	</aside>

	<svelte:fragment slot="footer">
		<button
			on:click={() => {
				onDelete(row.id);
				close();
			}}>Deletar</button
		>
		<button on:click={close}>Cancelar</button>
	</svelte:fragment>
</Modal>

<style>
	aside {
		margin: 40px 40px;
		width: 360px;
		color: #e57373;
		font-size: 14px;
	}
</style>
