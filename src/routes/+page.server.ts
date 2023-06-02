import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const actions: Actions = {
    login: async ({ request, locals }) => {
        const { email, password } = Object.fromEntries(await request.formData())

        if (email.length < 1) {
            return fail(400, {
                error: 'Email não pode ser vazio.'
            })
        }

        if (password.length < 1) {
            return fail(400, {
                error: 'Senha não pode ser vazia.'
            })
        }

        let { error: err } = await locals.supabase.auth.signInWithPassword({
            email: email as string,
            password: password as string
        })

        if (!err) {
            throw redirect(303, '/')
        }

        if (err instanceof AuthApiError && err.status === 400) {
            return fail(400, {
                error: 'Email ou senha inválidos.'
            })
        }

        return fail(500, {
            error: 'Erro interno do sistema. Por favor tente mais tarde.'
        })
    },
};

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
    const session = await getSession()

    // if the user is already logged in return them to the account page
    if (session) {
        throw redirect(303, '/dashboard')
    }

    return { url: url.origin }
}