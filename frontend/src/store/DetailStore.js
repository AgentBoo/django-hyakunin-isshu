import { configure, decorate, observable, computed, action } from "mobx";

// only allow state modifications by using actions
configure({ enforceActions: "observed" });

export class DetailStore {
	constructor(store) {
		this.datastore = store.dataStore;
	}

	// observable

	selected = null;

	// actions

	select(id) {
		const poemIndex = id - 1;
		this.selected = poemIndex;
	}

	// computed

	get poemExists() {
		return this.selected !== null && !this.datastore.isEmpty;
	}

	get poem() {
		const poems = this.datastore.collection;

		if (this.poemExists) {
			return poems[this.selected];
		} else {
			return null;
		}
	}
}

decorate(DetailStore, {
	selected: observable,
	select: action,
	poem: computed
});
