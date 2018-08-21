import { schema } from 'normalizr';

// Additional information on schemas and normalizr can be found at 
// https://github.com/paularmstrong/normalizr/blob/master/docs/api.md#schema

// normalize author 
export const authorSchema = new schema.Entity('authors')

// normalize poem
export const poemSchema = new schema.Entity('poems', {
	author: authorSchema
})

// normalize poems array
export const poemsSchema = new schema.Array(poemSchema)

// named urlpattern => schema mappings
const Schemas = {
	'fetch-poem'  : poemSchema,
	'FETCH_POEMS' : poemsSchema,
}

export default Schemas;