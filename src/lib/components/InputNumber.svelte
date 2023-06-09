<script lang="ts">
	export let value: number | undefined;
	export let icon: string;
	export let placeholder: number;
	export let name: string;
	export let id: string;

	import CurrencyInput from '@canutin/svelte-currency-input';
</script>

<div class="input-container">
	<label for={id} class="icon">
		<i class="micon">{icon}</i>
	</label>
	<CurrencyInput locale="pt-BR" currency="BRL" required bind:value {name} {placeholder} />
</div>

<style lang="scss">
	.icon {
		background-color: #e7e5e5;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		min-width: 50px;
		font-size: 25px;
		color: rgb(100, 100, 100);
	}

	div.input-container :global(input.currencyInput__formatted) {
		background-color: #e7e5e5;
		padding: 15px;
		outline: none;
		border: none;
		font-size: 15px;
		color: grey;
		overflow: hidden;

		&:focus {
			border-bottom: 1px solid rgb(1, 176, 195);
		}

		&:invalid {
			border-bottom: 1px solid rgb(195, 1, 1);
		}
		&:valid {
			border-bottom: 1px solid rgb(2, 154, 14);
		}

		width: -webkit-fill-available;
	}

	div.input-container :global(div.currencyInput) {
		flex-grow: 1;
	}

	.input-container {
		height: 100%;
		gap: 3px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 1;
		flex-grow: 1;
		height: 50px;
	}
</style>
