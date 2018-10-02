// @flow
// react
// https://flow.org/en/docs/react/children/
import * as React from "react";

type Props = {
	label: string | React.Element<"i">,
	onClick: () => void
};

// Example: scroll to top

const ButtonRound = (props: Props) =>
	/* prettier-ignore */
	<button
		type="button" 
		className="btn round" 
		onClick={props.onClick}>
		{props.label}
	</button>;

export { ButtonRound };

// Example: back and forward button

const ButtonBrick = (props: Props) =>
	/* prettier-ignore */
	<button
		type="button" 
		className="btn brick" 
		onClick={props.onClick}>
		{props.label}
	</button>;

export { ButtonBrick };
