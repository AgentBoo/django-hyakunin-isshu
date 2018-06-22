import React, { Component } from 'react';


class Card extends Component{
	renderCard = (item) => {
		let { locale } = this.props

		return item.map(verse => <p> { verse } </p>)
	}

	render(){
		let card = this.renderCard(this.props.poem[this.props.locale].poem.slice(1))
		
		return (
			<div>
				{ card }
			</div>
		)
	}
}

export default Card;