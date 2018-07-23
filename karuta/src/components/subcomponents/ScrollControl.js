// react 
import React from 'react';
// components 
import { ScrollTopButtonRound } from './../toolbox/Buttons';

const ScrollControl = ({ children }) => (
	<aside className='btn-group aside-scroll'>	
		{ children }
	</aside>
);

ScrollControl.Button = ScrollTopButtonRound; 

export default ScrollControl