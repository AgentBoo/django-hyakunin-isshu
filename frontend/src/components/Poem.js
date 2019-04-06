import React from "react";
import { Link } from "react-router-dom";

export const Poem = ({ poem, index, link }) => (
	<div>
		<p>{poem.author}</p>
		<p>{poem.verses}</p>
		{link && <Link to={`/${index}/`}>Detail</Link>}
	</div>
);
