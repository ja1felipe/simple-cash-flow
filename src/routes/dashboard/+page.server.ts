import type { Entry } from '$lib/stores/entries';
import type { Outflow } from '$lib/stores/outflows';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const getEntries = async () => {
		let { data: entries, error: err } = await supabase.from('entries').select();

		if (err) {
			return null;
		}

		return entries as Entry[];
	};

	const getOutflows = async () => {
		let { data: outflows, error: err } = await supabase.from('outflows').select();
		console.log(outflows);
		if (err) {
			return null;
		}

		return outflows as Outflow[];
	};

	return {
		entries: getEntries(),
		outflows: getOutflows()
	};
};

export const actions: Actions = {
	create_entry: async ({ request, locals }) => {
		const { description, value, date, payment_method } = Object.fromEntries(
			await request.formData()
		);

		const { data, error: err } = await locals.supabase
			.from('entries')
			.insert({ value, description, date, payment_method })
			.select();

		if (err) {
			console.error(err);
			return fail(500, {
				error: 'Erro interno do sistema. Por favor tente mais tarde.'
			});
		}

		return {
			entry: data[0] as Entry
		};
	},
	create_outflow: async ({ request, locals }) => {
		const { description, value, date } = Object.fromEntries(await request.formData());

		const { data, error: err } = await locals.supabase
			.from('outflows')
			.insert({ value, description, date })
			.select();

		if (err) {
			console.error(err);
			return fail(500, {
				error: 'Erro interno do sistema. Por favor tente mais tarde.'
			});
		}

		return {
			outflow: data[0] as Outflow
		};
	}
};
