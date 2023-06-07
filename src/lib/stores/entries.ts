import { writable } from 'svelte/store';

export interface Entry {
	id: number;
	created_at: string;
	value: number;
	description: string;
	date: string;
	payment_method: string;
}

export const entries = writable<Entry[]>([]);

export function removeEntry(id: number) {
	entries.update((currentEntries) => {
		return currentEntries.filter((entry) => {
			console.log(entry, id);
			return entry.id !== id;
		});
	});
}
