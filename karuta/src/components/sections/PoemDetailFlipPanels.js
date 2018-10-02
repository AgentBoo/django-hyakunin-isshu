// @flow
// react
import React, { Component } from "react";
// components
import { Link as ScrollLink } from "react-scroll";

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
	}
};

class PoemDetailFlipPanels extends Component<Props> {
	props: Props;

	renderVerses = (lang: string) =>
		this.props.poem[lang].verses.map((verse, idx) => (
			<p key={idx}> {verse} </p>
		));

	render() {
		// I have to render the verses multiple times in multiple places
		// so I wrapped it in an instance method for readability
		const japVerses = this.renderVerses("jap");
		const romVerses = this.renderVerses("rom");

		return (
			<section className="panels">
				{/* Romanized panel */}
				<section className="panel">
					<div className="cuboid-container">
						<div className="cuboid-flipper">
							<div className="card-verses front">{romVerses}</div>
							<div className="card-verses side">{romVerses}</div>
						</div>
					</div>
				</section>

				{/* Japanese verses panel */}
				<section className="panel">
					<div className="cuboid-container">
						<div className="cuboid-flipper">
							<div className="card-verses front">{japVerses}</div>
							<div className="card-verses side">{japVerses}</div>
						</div>
					</div>
				</section>

				{/* Japanese author panel */}
				<div className="panel jp-vertical">
					<div className="cuboid-container">
						<div className="cuboid-flipper">
							<div className="front">
								<p>{this.props.poem.jap.author}</p>
							</div>
							<div className="side">
								<p>{this.props.poem.jap.author}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Scroll-to-interpretation panel */}
				<div className="panel">
					<ScrollLink
						to="interpretation"
						delay={25}
						duration={1600}
						offset={10}
						smooth>
						<div className='front'>
						<p className='link-underlined'>Interpretation</p>
						</div>
					</ScrollLink>
				</div>
			</section>
		);
	}
	// end component
}

export default PoemDetailFlipPanels;
