import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals: { supabase } }) => {

    const getEntries = async () => {
        let { data: entries, error: err } = await supabase.from('entries').select()

        console.log('aaaaa', entries)

        if (err) {
            return null
        }

        return entries
    }

    const getOutflows = async () => {
        let { data: outflows, error: err } = await supabase.from('outflows').select()

        if (err) {
            return null
        }

        return outflows
    }

    return {
        entries: getEntries(),
        outflows: getOutflows()
    }
}