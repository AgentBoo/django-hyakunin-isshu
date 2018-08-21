// react
import React from 'react';
// router 
import { Link } from 'react-router-dom';


const CardBack = ({ poem, locale, onClick }) => {
	const handleClick = (event) => {
		event.stopPropagation()
		return onClick()
	}

	return (
		<section 
			className={ locale === 'jap' ? 'card-back jp-vertical' : 'card-back' }
			onClick={ handleClick }>
			<Link 
				className={ locale === 'jap' ? 'link' : 'link-underlined'} 
				to={ `/detail/${ poem.id}` }> 
				{ poem[locale].author }
			</Link>
		</section>
	)
};

export default CardBack;