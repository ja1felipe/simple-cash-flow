import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
    register: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        const { data, error: err } = await locals.supabase.auth.signUp({
            email: body.email as string,
            password: body.password as string
        })

        if (!err) {
            throw redirect(303, '/')
        }

        if (err instanceof AuthApiError && err.status === 400) {
            return fail(400, {
                error: "Email ou senha inválidos."
            })
        }
        return fail(500, {
            error: "Erro no servidor. Por favor tente mais tarde."
        })
    }
};