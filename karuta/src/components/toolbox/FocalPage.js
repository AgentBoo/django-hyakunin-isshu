// @flow
// react
// https://flow.org/en/docs/react/children/
import * as React from "react";

type Props = {
	children?: React.Node
};

const FocalPage = (props: Props) => (
	<div className="focal-page">{props.children}</div>
);

export default FocalPage;
