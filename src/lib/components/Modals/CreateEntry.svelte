<script lang="ts">
	import { Modal } from 'gros/modal';
	import InputText from '../InputText.svelte';
	const form = {
		description: undefined,
		value: undefined,
		date: undefined,
		payment_method: undefined
	};
	export let close: () => void;
</script>

<Modal title="Adicionar entrada de fluxo" icon="attach_money">
	<aside>
		<InputText
			icon="person"
			bind:value={form.description}
			name="description"
			id="description"
			placeholder="Descrição"
		/>
		<InputText
			icon="attach_money"
			bind:value={form.value}
			name="value"
			id="value"
			placeholder="Valor da entrada"
		/>
		<InputText
			icon="date_range"
			bind:value={form.date}
			name="date"
			id="date"
			placeholder="Data da entrada"
		/>
		<InputText
			icon="credit_card"
			bind:value={form.payment_method}
			name="payment_method"
			id="payment_method"
			placeholder="Método de pagamento"
		/>
	</aside>

	<svelte:fragment slot="footer">
		<button
			on:click={() => {
				close();
			}}>Adicionar</button
		>
		<button on:click={close}>Cancelar</button>
	</svelte:fragment>
</Modal>

<style>
	aside {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 360px;
		margin: 24px;
	}
</style>
