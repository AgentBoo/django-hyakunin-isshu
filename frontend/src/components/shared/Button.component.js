import React from "react";
import PropTypes from "prop-types"
import { noop } from "./../../utils/generic"

// className can be passed down by styled-components
// https://www.styled-components.com/docs/basics#styling-any-components

const Button = ({ disabled, className, onClick, children }) => (
	<button
		type="button"
		disabled={disabled}
		className={className}
		onClick={onClick}>
		{children}
	</button>
)

Button.defaultProps = {
	disabled: false,
	onClick: noop,
}

Button.propTypes = {
	disabled: PropTypes.bool,
	className: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export { Button }