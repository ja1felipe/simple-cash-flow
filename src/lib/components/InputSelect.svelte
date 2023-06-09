<script lang="ts">
	interface Props {
		value: string;
		name: string;
	}

	export let value: string | number | undefined;
	export let icon: string;
	export let name: string;
	export let id: string;
	export let options: Props[];
</script>

<div class="input-container">
	<label for={id} class="icon">
		<i class="micon">{icon}</i>
	</label>
	<select bind:value class="common-input" {name}>
		{#each options as opt}
			<option class="common-input" value={opt.value}>{opt.name}</option>
		{/each}
	</select>
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
		select {
			flex-grow: 1;
		}
	}
</style>
