import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestData } from './../../store/actions';
import { getPoems, getIsFetching } from './../../store/selectors';
import Card from './../presentational/Card'


class Main extends Component{
	componentDidMount(){
		this.props.requestData('/poems','poems','poems-list')
	}

	renderPoems = () => this.props.poems.map(poem => (
		<Card key={ poem.id } locale={ this.props.locale } poem={ poem } /> 
	))

	render(){
		let poems = this.props.poems ? this.renderPoems() : null 

		return(
			<section>
				{ poems }
			</section>
		)
	}
}


const mapStateToProps = state => ({
	poems: getPoems(state),
	isFetching: getIsFetching(state)
})

export default connect(mapStateToProps, { requestData })(Main);