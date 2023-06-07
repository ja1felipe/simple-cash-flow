import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const DELETE: RequestHandler = async ({ params, locals }) => {
    const { id } = params
    const { error: err } = await locals.supabase
        .from('outflows')
        .delete()
        .eq('id', id)

    if (err) {
        throw error(500, 'Alguma coisa falhou com a tentativa de deletar a saída de caixa.')
    }

    return json({
        success: true
    })
};