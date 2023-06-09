import type { Entry } from '$lib/stores/entries';
import type { Outflow } from '$lib/stores/outflows';
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
	create: async ({ request, locals }) => {
		const con = Object.fromEntries(await request.formData());
		console.log(con);
	}
};
