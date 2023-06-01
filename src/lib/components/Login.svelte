<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import Icon from '@iconify/svelte';

	let email: string;

	const submitLogin: SubmitFunction = ({}) => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'failure':
					toast.error(result.data?.error);
					break;
				default:
					break;
			}
			await update({ reset: false });
		};
	};

	async function forgotPassword() {
		if (!email || email.length < 1) {
			toast.error('Por favor, preencha o campo de email.');
			return;
		}
		const response = await fetch('api/forgot', {
			method: 'POST',
			body: JSON.stringify({ email }),
			headers: {
				'content-type': 'application/json'
			}
		});

		const res = await response.json();
		if (res.success) {
			toast.success(`Foi enviado um link para recuperação de senha ao email:\n${email}`, {
				duration: 6000
			});
		}
	}
</script>

<div class="container">
	<div class="sub-container">
		<div class="header"><h1>painel de controle</h1></div>
		<form class="common-form login-form" method="post" action="?/login" use:enhance={submitLogin}>
			<div class="input-container">
				<div class="icon">
					<Icon icon="mdi:user" />
				</div>
				<input
					required
					bind:value={email}
					class="common-input"
					type="email"
					name="email"
					placeholder="Email"
					id="email"
				/>
			</div>
			<div class="input-container">
				<div class="icon">
					<Icon icon="material-symbols:lock" />
				</div>
				<input
					required
					class="common-input"
					type="password"
					name="password"
					placeholder="Password"
					id="password"
				/>
			</div>
			<button type="submit" class="common-button login-button">Entrar</button>
		</form>
		<button on:click={forgotPassword} class="forgot-button">esqueci a senha</button>
	</div>
</div>

<style lang="scss">
	.forgot-button {
		background-color: transparent;
		border: none;
		color: grey;
		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}

	.login-button {
		border: none;
		background-color: #f62828;
		margin-top: 20px;
		text-transform: uppercase;
		color: white;
		font-weight: bold;

		&:hover {
			background-color: #f30d0d;
			cursor: pointer;
		}
	}

	.login-form {
		display: flex;
		flex-direction: column;
		background-color: white;
		width: 100%;
		padding: 50px;
		box-sizing: border-box;
	}

	.input-container {
		gap: 3px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 1;
		flex-grow: 1;
		input {
			flex-grow: 1;
		}
	}

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

	.header {
		background-color: rgb(175, 0, 0);
		padding: 10px;
		width: 100%;
		box-sizing: border-box;

		color: white;
		text-align: center;

		h1 {
			font-size: 20px;
			text-transform: uppercase;
		}
	}
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		flex-direction: column;
		gap: 5px;
		margin: auto;
	}

	.sub-container {
		border-radius: 3px;
		overflow: hidden;
		box-shadow: 0 5px rgb(122, 47, 47);
		width: 33%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background-color: white;

		@media (max-width: 1200) {
			width: 45%;
		}

		@media (max-width: 900px) {
			width: 66%;
		}
	}
</style>
