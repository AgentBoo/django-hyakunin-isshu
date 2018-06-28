import React, { Component } from 'react';
import CardDetail from './../presentational/CardDetail'
import CardFront from './../presentational/CardFront'
import { PopOver } from 'react-bootstrap';


class Card extends Component{
	constructor(props){
		super(props)

		this.state = {
			frontface: true 
		}
	}

	flipCard = () => {
		this.setState({ frontface: !this.state.frontface })
	}

	render(){
		return (
			<div>
				<div>
					<CardFront poem={ this.props.poem } 
							   locale={ this.props.locale } />

					<CardDetail poem={ this.props.poem } />
				</div>
			</div>
		)
	}
}

export default Card;


