<script lang="ts">
	import { Modal } from 'gros/modal';
	import InputText from '../InputText.svelte';
	import InputNumber from '../InputNumber.svelte';
	import InputDate from '../InputDate.svelte';
	import InputSelect from '../InputSelect.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { entries, type Entry } from '$lib/stores/entries';
	const form = {
		description: undefined,
		value: undefined,
		date: undefined,
		payment_method: 'Pix'
	};
	export let close: () => void;

	const createEntry: SubmitFunction = ({}) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					toast.error(result.data?.error);
					break;
				case 'success':
					toast.success('Entrada de fluxo adicionada com sucesso');
					let data = result.data?.entry as Entry;
					entries.addEntry(data);
					break;
				default:
					break;
			}
			await update({ reset: false });
		};
	};
</script>

<Modal title="Adicionar entrada de fluxo" icon="attach_money">
	<form id="create-form" method="post" action="?/create_entry" use:enhance={createEntry}>
		<InputText
			icon="assignment"
			bind:value={form.description}
			name="description"
			id="description"
			placeholder="Descrição"
		/>
		<InputNumber
			icon="attach_money"
			bind:value={form.value}
			name="value"
			id="value"
			placeholder={0}
		/>
		<InputDate
			icon="date_range"
			bind:value={form.date}
			name="date"
			id="date"
			placeholder="Data da entrada"
		/>
		<InputSelect
			icon="credit_card"
			bind:value={form.payment_method}
			name="payment_method"
			id="payment_method"
			options={[
				{
					name: 'Pix',
					value: 'Pix'
				},
				{
					name: 'Cartão de crédito',
					value: 'Cartao'
				},
				{
					name: 'Outro',
					value: 'Outro'
				}
			]}
		/>
	</form>

	<svelte:fragment slot="footer">
		<button
			type="submit"
			form="create-form"
			on:click={() => {
				close();
			}}>Adicionar</button
		>
		<button on:click={close}>Cancelar</button>
	</svelte:fragment>
</Modal>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 5px;
		width: 360px;
		margin: 24px;
	}
</style>
