import { configure, decorate, observable, computed, action } from "mobx";
import { poemsPerPage } from "./../config/constants";

// don't allow state modifications using anything but actions
configure({ enforceActions: "observed" });

export class ListStore {
	constructor(store) {
		this.store = store;
	}

	// observable

	pageRange = [0, poemsPerPage];
	locale = "jap";
	searchPhrase = "";

	// actions

	setPageRange(pageNumber) {
		const pageStart = pageNumber * poemsPerPage;
		const pageEnd = pageStart + poemsPerPage;
		this.pageRange = [pageStart, pageEnd];
	}

	setLocale(locale) {
		this.locale = locale;
	}

	setSearchPhrase(phrase) {
		this.searchPhrase = phrase;
	}

	// computed

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
		let poems = this.store.data.collection;

		if (poems.length) {
			const [pageStart, pageEnd] = this.pageRange;
			poems = poems.slice(pageStart, pageEnd);
			return poems.map(poem => poem[this.locale]);
		} else {
			return [];
		}
	}

	get searchResults() {
		const poems = this.store.data.collection;

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
	pageRange: observable,
	setPageRange: action,
	locale: observable,
	setLocale: action,
	searchPhrase: observable,
	setSearchPhrase: action,
	list: computed
});
