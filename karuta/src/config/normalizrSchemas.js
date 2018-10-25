// @flow 
// normalizr
import { schema } from "normalizr";

// Source
// https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema

export const poemSchema = new schema.Entity("poems")
export const poemsSchema = new schema.Array(poemSchema);


// url key => schema mappings
/* prettier-ignore */
const Schemas = {
	'fetch-poems': poemsSchema,
}

export default Schemas;
