import { schema } from 'normalizr';


export const author = new schema.Entity('authors')

export const poem = new schema.Entity('poems', {
	author: author
})

export const poems = new schema.Array(poem)


