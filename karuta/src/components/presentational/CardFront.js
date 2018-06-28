import React from 'react';

const CardFront = ({ poem, locale }) => {
	const getTranslatedPoem = () => {
		if(locale){
			return {
				author: poem[locale].author,
				verses: poem[locale].verses
			}
		} else {
			return {
				author: poem.jap.author,
				verses: poem.jap.verses 
			}
		}
	}

	let { author, verses } = getTranslatedPoem()

	return (
		<section>
			<h4> { author } </h4>
			<p> { verses[0] } </p>
			<p> { verses[1] } </p>
			<p> { verses[2] } </p>
			<p> { verses[3] } </p>
			<p> { verses[4] } </p>
		</section>
	)
}

export default CardFront