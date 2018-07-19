// react
import React from 'react';


// scroll to top 
const ScrollTopButtonRound = ({ label, onClick }) => (
	<button 
		className='btn round'
		onClick={ onClick }> 
		{ label } 
	</button>
);

export { ScrollTopButtonRound };

