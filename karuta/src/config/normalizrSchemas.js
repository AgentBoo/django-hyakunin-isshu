// @flow 
// normalizr
import { schema } from "normalizr";

// Additional information on schemas and normalizr can be found at
// https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema

// normalize poem
export const poemSchema = new schema.Entity("poems")

// normalize poems array
export const poemsSchema = new schema.Array(poemSchema);

// named urlpattern => schema mappings
/* prettier-ignore */
const Schemas = {
	'FETCH_POEMS' 		: poemsSchema,
	'FETCH_TRANSLATIONS': 'translationsSchema'
}

export default Schemas;
