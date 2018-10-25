// @flow
// react
import React, { Component } from "react";
// components
import { CSSTransition } from "react-transition-group";

type Props = {
	poem: {
		id: number,
		[string]: {
			author: string,
			verses: string[]
		}
	},
	locale: string,
	onClick: () => void
};

type State = {
	switchLanguage: boolean
};

class CardFront extends Component<Props, State> {
	props: Props;
	state: State;

	constructor(props: Props) {
		super(props);
		this.state = {
			switchLanguage: false
		};
	}

	componentDidUpdate(prevProps: Props) {
		/*
			It is not ideal to setState() in componentDidUpdate
			https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-mount-set-state.md
		*/
		if (this.props.locale !== prevProps.locale) {
			return this.toggleTransition()
		}
	}

	toggleTransition = () =>
		this.setState({ switchLanguage: !this.state.switchLanguage });

	render() {
		const { locale, verses } = this.props;

		return (
			<section
				className={
					locale === "jap" ? "card-front jp-vertical" : "card-front"
				}
				onClick={this.props.onClick}>
				<CSSTransition
					in={this.state.switchLanguage}
					timeout={500}
					classNames="shortfade"
					onEntered={this.toggleTransition}>
					<div className="card-verses">
						<p> {verses[0]} </p>
						<p> {verses[1]} </p>
						<p> {verses[2]} </p>
						<p> {verses[3]} </p>
						<p> {verses[4]} </p>
					</div>
				</CSSTransition>
				<span className="card-numeral"> [{this.props.poemId}] </span>
			</section>
		);
	}
}

export default CardFront;
