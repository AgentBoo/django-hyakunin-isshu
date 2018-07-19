// react 
import React from 'react';
// components 
import { ScrollTopButtonRound } from './../toolbox/Buttons';

const ScrollControl = ({ children }) => (
	<aside className='btn-group aside-scroll'>	
		{ children }
	</aside>
);

const Button = ({ label, onClick }) => (
	<button 
		type = 'button'
		className = 'btn round'
		onClick = { onClick }>
		{ label }
	</button>
)

ScrollControl.Button = Button; 

export default ScrollControl