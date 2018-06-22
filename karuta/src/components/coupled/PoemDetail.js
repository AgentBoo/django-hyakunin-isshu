import React, { Component } from 'react';


class PoemDetail extends Component{
	constructor(props){
		super(props)

		this.state = {
			data: {}
		}
	}

	componentDidMount(){
		let url = 'http://127.0.0.1:8000/api/poems/' + this.props.match.params.id
		fetch(url).then(res => res.json()).then(resjson => {this.setState({
					data: resjson
				})
		console.log(this.state.data)}
		)
	}

	render(){
		let author = this.state.data.author.jap 
		return (<p> Hello { author } </p>)
	}

};


export default PoemDetail;
