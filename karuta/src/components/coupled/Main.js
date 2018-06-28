import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestData } from './../../store/actions';
import { getPoems, getIsFetching } from './../../store/selectors';
import Card from './../coupled/Card'


class Main extends Component{
	componentDidMount(){
		this.props.requestData('/poems','poems','poems-list')
	}

	renderPoems = (N=100) => this.props.poems.slice(0,N).map(poem => (
		<Card key={ poem.id }
			  poem={ poem } 
			  locale={ this.props.locale } /> 
	))

	render(){
		let poems = this.props.poems ? this.renderPoems(1) : null 

		return(
			<main>
				{ poems }
			</main>
		)
	}
}


const mapStateToProps = state => ({
	poems: getPoems(state),
	isFetching: getIsFetching(state)
})

export default connect(mapStateToProps, { requestData })(Main);