import { configure, decorate, observable, computed, action } from "mobx";
import { pagination, poemsPerPage } from "./../config/constants";

// don't allow state modifications using anything but actions
configure({ enforceActions: "observed" });

export class ListStore {
	constructor(store) {
		this.datastore = store.dataStore;
	}

	// observable

	page = 0
	locale = "jap";
	searchPhrase = "";

	// actions

	setPage(pageNumber) {
		if(0 <= pageNumber && pageNumber < pagination.length){
			this.page = pageNumber
		}
	}

	setLocale(locale) {
		this.locale = locale;
	}

	setSearchPhrase(phrase) {
		this.searchPhrase = phrase;
	}

	// computed

	get pageRange() {
		const pageStart = this.page * poemsPerPage;
		const pageEnd = pageStart + poemsPerPage;
		return [pageStart, pageEnd];
	}

	get list() {
		if (this.isSearchingPhrases) {
			return this.searchResults;
		} else {
			return this.pageResults;
		}
	}

	// helpers

	get isSearchingPhrases() {
		return this.searchPhrase.length;
	}

	get pageResults() {
		if (this.datastore.isEmpty) {
			return []
		} else {
			const [pageStart, pageEnd] = this.pageRange;
			const poems = this.datastore.collection.slice(pageStart, pageEnd);
			return poems.map(poem => poem[this.locale]);
		}
	}

	get searchResults() {
		const poems = this.datastore.collection;

		// don't use /g flag for the regex
		// https://stackoverflow.com/a/1520853

		let regex = new RegExp(this.searchPhrase, "i");
		let results = [];

		for (let i = 0; i < poems.length; i++) {
			const poem = poems[i][this.locale];
			/* prettier-ignore */
			const testString = poem.verses.concat(poem.author, poem.numeral).join(" ");
			const result = regex.test(testString);

			if (result) {
				results.push(poem);
			}
		}

		return results;
	}
}

decorate(ListStore, {
	page: observable,
	setPage: action,
	locale: observable,
	setLocale: action,
	searchPhrase: observable,
	setSearchPhrase: action,
	pageRange: computed,
	list: computed
});
