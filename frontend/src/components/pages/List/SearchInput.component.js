import React, { Component } from "react";
import { StyledInput } from "./SearchInput.styled";

class SearchInput extends Component {
	constructor(props) {
		super(props);
		this.innerRef = React.createRef();
	}

	componentDidMount() {
		this.focus();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.placeholder !== this.props.placeholder) {
			this.focus();
		}
	}

	focus = () => {
		this.innerRef.current.focus();
	};

	handleChange = event => {
		this.props.onChange(event.target.value);
	};

	render() {
		return (
			<StyledInput
				type="text"
				ref={this.innerRef}
				value={this.props.value}
				onChange={this.handleChange}
				placeholder={this.props.placeholder} />
		);
	}
}

export { SearchInput };
