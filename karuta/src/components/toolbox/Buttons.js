// react
import React from 'react';


// scroll to top 
const ScrollTopButtonRound = ({ label, onClick }) => (
	<button 
		type = 'button'
		className = 'btn round'
		onClick = { onClick }>
		{ label }
	</button>
);

export { ScrollTopButtonRound };

