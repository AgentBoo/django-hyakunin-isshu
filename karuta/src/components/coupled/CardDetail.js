import React, { Component } from 'react';
import { PopOver } from 'react-bootstrap';


class CardDetail extends Component{
	renderPoem = (poem) => {
		let jap = this.renderVerses(poem.jap)
		let eng = this.renderVerses(poem.eng)
		let rom = this.renderVerses(poem.rom)

		let main = this.props.language ? this.renderVerses(poem[this.props.language]) : jap

		return(
			<div>
				<div> { jap } { eng } { rom } </div>
				<div> { main } </div>
			</div>
		)
	}
	
	render(){
		return (
			<p> I am a card detail </p>
		)
	}
}