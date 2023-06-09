<script lang="ts">
	export let value: string | number | undefined;
	export let icon: string;
	export let placeholder: string;
	export let name: string;
	export let id: string;
</script>

<div class="input-container">
	<label for={id} class="icon">
		<i class="micon">{icon}</i>
	</label>
	<input required bind:value class="common-input" type="date" {name} {placeholder} {id} />
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

	.input-container {
		height: 100%;
		gap: 3px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 1;
		flex-grow: 1;
		height: 50px;
		input {
			flex-grow: 1;
		}
	}
</style>
