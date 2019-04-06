import React from "react";

export const Translation = ({ translation, index }) => (
	<div>
		<p>{translation.author}</p>
		<p>{translation.verses}</p>
		<p>{translation.translator}</p>
	</div>
);
