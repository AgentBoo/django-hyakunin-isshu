// react
import React from 'react';


// Example: scroll to top
const ButtonRound = ({ label, onClick }) => (
	<button
		type = 'button'
		className = 'btn round'
		onClick = { onClick }>
		{ label }
	</button>
);

export {  ButtonRound };

// Example: back and forward button
const ButtonBrick = ({ label, onClick }) => (
	<button
		type = 'button'
		className = 'btn brick'
		onClick = { onClick }>
		{ label }
	</button>
);

export {  ButtonBrick };
