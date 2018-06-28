import React from 'react';


const CardDetail = ({ poem }) => {
	const renderPoem = (language) => {
		let author = poem[language].author
		let verses = poem[language].verses.map(verse => <p> { verse } </p>)

		return (
			<div>
				<h4> { author } </h4>
					 { verses }
			</div>
		)
	}

	let japanese = renderPoem('jap')
	let romanized = renderPoem('rom')
	let english = renderPoem('eng')

	return (
		<section>
			{ japanese }
			{ romanized }
			{ english }
		</section>
	)
	
}

export default CardDetail;