// react 
import React, { Component } from 'react';
// components 
import { CSSTransition } from 'react-transition-group'
import CardBack from './CardBack'
import CardFront from './CardFront'


class Card extends Component{
	constructor(props){
		super(props)
		this.state = {
			showFront: true 
		}
	}

	flipCard = (event) => this.setState({ showFront: !this.state.showFront })

	render(){
		return (
			<div className='card flip-container'>
				<CSSTransition
					in={ this.state.showFront }
					timeout={ 1000 }
					classNames='flipper'>
					<CardFront 
						poem={ this.props.poem } 
						locale={ this.props.locale } 
						onClick={ this.flipCard }/>
				</CSSTransition>

				<CSSTransition
					in={ !this.state.showFront }
					timeout={ 1000 }
					classNames='flipper'>
					<CardBack 
						poem={ this.props.poem } 
						locale={ this.props.locale }
						onClick={ this.flipCard }/>
				</CSSTransition>			
			</div>
		)
	}
};

export default Card;


