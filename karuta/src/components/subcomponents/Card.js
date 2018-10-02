// @flow
// react
import React, { Component } from "react";
// components
import { CSSTransition } from "react-transition-group";
import CardBack from "./CardBack";
import CardFront from "./CardFront";

type Props = {|
	locale: string,
	poem: {
		id: number,
		[string]: {
			author: string,
			verses: string[]
		}
	}
|};

type State = {
	showFront: boolean
};

class Card extends Component<Props, State> {
	props: Props;
	state: State;

	constructor(props: Props) {
		super(props);
		this.state = {
			showFront: true
		};
	}

	flipCard = () =>
		this.setState({
			showFront: !this.state.showFront
		});

	render() {
		return (
			<div className="card flip-container">
				<CSSTransition
					in={this.state.showFront}
					timeout={1000}
					classNames="flipper">
					<CardFront
						verses={this.props.poem.verses}
						poemId={this.props.poem.id}
						locale={this.props.locale}
						onClick={this.flipCard}
					/>
				</CSSTransition>

				<CSSTransition
					in={!this.state.showFront}
					timeout={1000}
					classNames="flipper">
					<CardBack
						author={this.props.poem.author}
						poemId={this.props.poem.id}
						locale={this.props.locale}
						onClick={this.flipCard}
					/>
				</CSSTransition>
			</div>
		);
	}
}

export default Card;
