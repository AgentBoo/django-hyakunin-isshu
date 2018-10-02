/* STATE SELECTORS */

export const getIsFetching = state => state.isFetching;

export const getFlashMessage = state => state.flashMessage;

export const getPoems = (state, locale = "jap") => {
	if (state.isFetching && !state.index.length) {
		return [];
	}

	let { poems } = state.collections;

	return state.index.map(id => ({
		id: id,
		author: poems[id][locale][0],
		verses: poems[id][locale].slice(1, 6)
	}));
};

export const getPoem = (state, id) => {
	if (state.isFetching && !state.index.length) {
		return {
			id: null,
			jap: {
				author: null,
				verses: []
			},
			rom: {
				author: null,
				verses: []
			},
			eng: {
				author: null,
				verses: []
			}
		};
	}

	let { poems } = state.collections;

	return {
		id: id,
		jap: {
			author: poems[id].jap[0],
			verses: poems[id].jap.slice(1, 6)
		},
		rom: {
			author: poems[id].rom[0],
			verses: poems[id].rom.slice(1, 6)
		},
		eng: {
			author: poems[id].eng[0],
			verses: poems[id].eng.slice(1, 6)
		}
	};
};
