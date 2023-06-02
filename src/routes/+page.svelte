<script lang="ts">
	import Login from '$lib/components/Login.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<div>
	<div class="col-6 form-widget">
		{#if data.session}
			Bem vindo a essa desgraça {data.session.user.email}
		{:else}
			<Login />
		{/if}
	</div>
</div>
