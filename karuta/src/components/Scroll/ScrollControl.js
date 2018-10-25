// @flow
// react
// https://flow.org/en/docs/react/children/
import * as React from "react";
// components
import { ButtonRound } from "./../toolbox/Buttons";

type Props = {
	children?: React.Node
};

const ScrollControl = (props: Props) => (
	<aside className="btn-group page-control">{props.children}</aside>
);

ScrollControl.Button = ButtonRound;

export default ScrollControl;
