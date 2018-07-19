// react
import React, { Component } from 'react';
// components 
import { CSSTransition } from 'react-transition-group';


class CardFront extends Component{
	constructor(props){
		super(props)
		this.state = {
			switchLanguage: false 
		}
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.locale !== prevProps.locale){
			return this.setState({ switchLanguage: !this.state.switchLanguage })
		}
	}

	endTransition = () => this.setState({ switchLanguage: !this.state.switchLanguage })

	render(){
		const { locale } = this.props 
		const { verses } = this.props.poem[locale]

		return (
			<section 
				className={ locale === 'jap' ? 'card-front jp-vertical' : 'card-front'}
				onClick={ this.props.onClick }>
				<CSSTransition
					in={ this.state.switchLanguage } 
					timeout={ 500 } 
					classNames='shortfade'
					onEntered={ this.endTransition }>
					<div className='card-verses'>
						<p> { verses[0] } </p>
						<p> { verses[1] } </p>
						<p> { verses[2] } </p>
						<p> { verses[3] } </p>
						<p> { verses[4] } </p>
					</div>
				</CSSTransition>
				<span className='card-numeral'> [{ this.props.poem.id }] </span>
			</section>
		)
	}
};

export default CardFront;