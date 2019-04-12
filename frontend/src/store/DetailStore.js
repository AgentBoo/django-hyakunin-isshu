import { configure, decorate, observable, computed, action } from "mobx";

// only allow state modifications by using actions
configure({ enforceActions: "observed" });

export class DetailStore {
	constructor(store) {
		this.store = store;
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
		return this.selected && this.store.data.collection.length;
	}

	get poem() {
		const poems = this.store.data.collection;

		if (this.poemExists) {
			return poems[this.selected];
		} else {
			return {};
		}
	}
}

decorate(DetailStore, {
	selected: observable,
	select: action,
	poemExists: computed,
	poem: computed
});
