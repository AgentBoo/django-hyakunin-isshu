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
				poem: poems[id].jap
			},
			rom: {
				author: authors[id].rom,
				poem: poems[id].rom
			},
			eng: {
				author: authors[id].eng,
				poem: poems[id].eng 
			},
		})
	  )
	}
}

