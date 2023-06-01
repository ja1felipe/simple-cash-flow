import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals }) => {
    const { email } = await request.json()

    let { error: err } = await locals.supabase.auth.resetPasswordForEmail(email)
    if (err) {
        throw error(500, 'Alguma coisa falhou com a tentativa de recuperação de senha. Por favor tente novamente mais tarde.')
    }
    return json({
        success: true
    })
};