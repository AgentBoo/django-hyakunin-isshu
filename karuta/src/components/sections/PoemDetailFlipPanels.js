// react 
import React, { Component } from 'react';
// components 
import { Link as ScrollLink } from 'react-scroll'


class PoemDetailFlipPanels extends Component{
	renderVerses= (lang) => this.props.poem[lang].verses.map((verse,idx) => (
		<p key={idx}> { verse } </p>
	))

	render(){
		const japVerses = this.props.poem ? this.renderVerses('jap') : null
		const romVerses = this.props.poem ? this.renderVerses('rom') : null

		return(
			<section className='panels'>
				{/* Romanized panel */}
				<section className='panel'>
					<div className='cuboid-container'>
						<div className='cuboid-flipper'>
							<div className='card-verses front'>
								{ romVerses }
							</div>
							<div className='card-verses side'>
								{ romVerses }
							</div>
						</div>
					</div>
				</section>

				{/* Japanese verses panel */}
				<section className='panel'>
					<div className='cuboid-container'>
						<div className='cuboid-flipper'>
							<div className='card-verses front'>
								{ japVerses }
							</div>
							<div className='card-verses side'>
								{ japVerses }
							</div>
						</div>
					</div>
				</section>

				{/* Japanese author panel */}
				<div className='panel jp-vertical'>
					<div className='cuboid-container'>
						<div className='cuboid-flipper'>
							<div className='front'>
								<p> { this.props.poem ? this.props.poem.jap.author : null } </p>
							</div>
							<div className='side'>
								<p> { this.props.poem ? this.props.poem.jap.author : null } </p>
							</div>
						</div>
					</div>
				</div>

				{/* Scroll-to-interpretation panel */}
				<div className='panel'>
					<ScrollLink
						to='interpretation'
						delay={25}
						duration={1600}
						offset={10}
						smooth>
						<div className='cuboid-container'>
							<div className='cuboid-flipper'>
								<div className='front'>
									<p>Interpretation</p>
								</div>
								<div className='side'>
									<p>Interpretation</p>
								</div>
							</div>
						</div>
					</ScrollLink>
				</div>
			</section>
		)
	}
// end component 
}

export default PoemDetailFlipPanels;