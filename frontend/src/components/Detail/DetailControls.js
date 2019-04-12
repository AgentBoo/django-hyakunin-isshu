import React from "react";
import { Link } from "react-router-dom";

const DetailControls = ({path, id, minId=1, maxId=100}) => (
	<section>
		{id !== minId && (
			<Link to={`${path.replace(":id", id - 1)}`}> --prev</Link>
		)}
		<span>|</span>
		{id !== maxId && (
			<Link to={`${path.replace(":id", id + 1)}`}>next-- </Link>
		)}
	</section>
);

export { DetailControls }