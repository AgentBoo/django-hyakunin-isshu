// selectors 

export const getIsFetching = (state) => state.isFetching

export const getErrorMessage = (state) => state.errorMessage

export const getPoems = (state) => {
	if(state.index){
		let { authors, poems } = state.collections

		return state.index.map((id) => ({
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
			},
		})
	  )
	}
}

