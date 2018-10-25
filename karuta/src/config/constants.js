// @flow
// API root
const heroku = "https://fathomless-ravine-59797.herokuapp.com/api";
const local = "http://127.0.0.1:8000/api";

export const API_ROOT = process.env.NODE_ENV === "production" ? heroku : local 


export const requestType = {
	GET: 'GET',
	POST: 'POST',
	PATCH: 'PATCH',
	DELETE: 'DELETE'
}


// url key => endpoint mappings
/* prettier-ignore */
export const endpoint = {
  'fetch-poems': API_ROOT + "/poems",
};


// url key => action type mappings
/* prettier-ignore */
export const actionType = {
  'data-request': "DATA_REQUEST",
  'data-success': "DATA_SUCCESS",
  'data-failure': "DATA_FAILURE",
  'fetch-poems': "FETCH_POEMS"
};
