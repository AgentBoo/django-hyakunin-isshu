/* STATE SELECTORS */ 

export const getIsFetching = (state) => state.isFetching;

export const getFlashMessage = (state) => state.flashMessage;

export const getPoems = (state, locale='jap') => {
	if(!state.isFetching && state.poemIndex.length){
		let { authors, poems } = state.collections

		return state.poemIndex.map(id => ({
			id: id,
			[locale]: {
				author: authors[id][locale],
				verses: poems[id][locale]
			},
		}))
	};

	return []
};

export const getPoem = (state, id) => {
	if(!state.isFetching && state.poemIndex.length){
		let { authors, poems } = state.collections
		
		return {
			id: id,
			jap: {
				author: authors[id].jap,
				verses: poems[id].jap
			},
			rom: {
				author: authors[id].rom,
				verses: poems[id].rom
			},
			eng: {
				author: authors[id].eng,
				verses: poems[id].eng 
			}
		}
	};

	return {}
};