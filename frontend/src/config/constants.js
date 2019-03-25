// API
const heroku = "https://app.herokuapp.com/api";
const local = "http://127.0.0.1:8000/api";

const API_ROOT = process.env.NODE_ENV === "production" ? heroku : local;

// ENDPOINTS
// nomenclature: list, create, retrieve, update, destroy

export const endpoints = {
	'poems'	: () => API_ROOT + "/poems/",
	'poem' 	: ({id}) => API_ROOT + `/poems/${id}/`
};
