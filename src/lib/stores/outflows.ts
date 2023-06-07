import { writable } from 'svelte/store';

export interface Outflow {
    id: number;
    created_at: string;
    value: number;
    description: string;
    date: string;
}
function createStore() {
    const { subscribe, update, set } = writable<Outflow[]>([]);

    return {
        subscribe,
        set,
        removeOutflow(id: number) {
            update((currentOutflows) => {
                return currentOutflows.filter((outflow) => {
                    return outflow.id !== id;
                });
            });
        }
    }
}

export const outflows = createStore()