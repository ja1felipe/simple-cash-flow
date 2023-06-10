import { writable } from 'svelte/store';

export interface Entry {
	id: number;
	created_at: string;
	value: number;
	description: string;
	date: string;
	payment_method: string;
}
function createStore() {
	const { subscribe, update, set } = writable<Entry[]>([]);

	return {
		subscribe,
		set,
		removeEntry(id: number) {
			update((currentEntries) => {
				return currentEntries.filter((entry) => {
					return entry.id !== id;
				});
			});
		},
		addEntry(entry: Entry) {
			update((currentEntries) => {
				currentEntries.push(entry);
				return currentEntries;
			});
		}
	};
}

export const entries = createStore();
