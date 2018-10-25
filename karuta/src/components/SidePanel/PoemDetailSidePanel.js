// @flow
// react
import React, { Component } from "react";
// router
import { Link } from "react-router-dom";
// components
import { animateScroll as scroll } from "react-scroll";
import { ButtonBrick } from "./../toolbox/Buttons";

type Props = {
	poem: {
		id: number | null,
		jap: {
			author: string | null,
			verses: string[]
		},
		rom: {
			author: string | null,
			verses: string[]
		},
		eng: {
			author: string | null,
			verses: string[]
		}
	},
	translations: {
		[string]: string[]
	},
	translator: string,
	switchTranslation: (translator: string) => void
};

class PoemDetailSidePanel extends Component<Props> {
	props: Props;

	getPreviousPage = () =>
		this.props.poem.id !== "1" ? 1 * (this.props.poem.id || 1) - 1 : 1;

	getNextPage = () =>
		this.props.poem.id !== "100" ? 1 * (this.props.poem.id || 1) + 1 : 100;

	scrollToTop = () =>
		scroll.scrollToTop({
			duration: 1600,
			delay: 50,
			smooth: "easeInOutCubic"
		});

	renderTranslators = () => {
		const controls = Object.keys(this.props.translations).map(
			(translator, idx) => (
				<button
					key={idx}
					className={
						translator === this.props.translator ? "active" : null
					}
					type="button"
					onClick={() => this.props.switchTranslation(translator)}>
					{translator}
				</button>
			)
		);

		return <section>{controls}</section>;
	};

	render() {
		const translators = this.renderTranslators();
		console.log(this.props)
		return (
			<aside className="lateral-page-side">
				<div className="lateral-page-side-content">
					{/* Numeral */}
					<h1> {this.props.poem.id} </h1>

					{/* Author */}
					<section className="author">
						<h3> {this.props.poem.rom.author} </h3>
						<p> {this.props.poem.eng.author} </p>
					</section>

					{/* Different translators */}
					{translators}

					{/* Displayed translation */}
					<section>
						{this.props.translations[this.props.translator].map(
							(verses, idx) => (
								<p key={idx}> {verses} </p>
							)
						)}
					</section>

					{/* Page controls */}
					<section>
						<div className="btn-group page-control">
							<Link to="/" className="btn brick">
								Poems
							</Link>
							<Link
								to={`/detail/${this.getPreviousPage()}`}
								className="btn brick">
								<i class="fas fa-long-arrow-alt-left"></i>
							</Link>
							<ButtonBrick
								label={<i class="fas fa-long-arrow-alt-up"></i>}
								onClick={this.scrollToTop}
							/>
							<Link
								to={`/detail/${this.getNextPage()}`}
								className="btn brick">
								<i class="fas fa-long-arrow-alt-right"></i>
							</Link>
						</div>
					</section>
				</div>
			</aside>
		);
	}
	// end component
}

export default PoemDetailSidePanel;
