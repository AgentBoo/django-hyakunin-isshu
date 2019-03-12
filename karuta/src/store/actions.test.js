import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import * as actions from "./actions";
import { actionType } from "./../config/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/*
	https://redux.js.org/recipes/writingtests
*/

describe("fetch actions", () => {
	afterEach(() => {
		fetchMock.reset()
		fetchMock.restore()
	})

	it('creates FETCH_POEM', () => {
		fetchMock.getOnce('/poems', {
			body: { 
				todos: ['do something']
			},
			headers: {
				'content-type': 'application/json'
			}
		})

		const expectedActions = [
			{ type: actionType['DATA_REQUEST']},
			{ type: actionType['FETCH_POEM'], body: { todos: ['do something']}}
		]

		const store = mockStore({ todos: [] })
	
		return store.dispatch(actions.fetchTodos()).then(() => {
			expect(store.getActions()).toEqual(expectedActions)
		})

	})
});
