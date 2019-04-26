// API

const heroku = "https://app.herokuapp.com/api";
const local = "http://127.0.0.1:8000/api";

const API_ROOT = process.env.NODE_ENV === "production" ? heroku : local;

// ENDPOINTS

export const endpoints = {
	poems	: () => API_ROOT + `/poems/`,
	poem 	: ({ id }) => API_ROOT + `/poems/${id}/`
};

// LANGUAGES

const languageMap = new Map([
	["jap", "Japanese"],
	["rom", "Romaji"],
	["eng", "English"]
]);

export const languages = [...languageMap];

// PAGINATION

export const poemsPerPage = 10;

// https://stackoverflow.com/a/33352604
export const pagination = [...Array(Math.ceil(100 / poemsPerPage)).keys()];

// MESSAGES

export const rejection = "Network response was not OK";
