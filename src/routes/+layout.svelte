<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.scss';
	import '@fontsource/roboto';
	import '@fontsource/roboto/400.css';
	import '@fontsource/roboto/500.css';
	import { Toaster } from 'svelte-french-toast';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { ModalContainer } from 'gros/modal';

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Caixa Ellen</title>
</svelte:head>
<ModalContainer />
<Toaster />
<div>
	<slot />
</div>
