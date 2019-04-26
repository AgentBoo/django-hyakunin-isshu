import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { StyledSection, StyledLink, Label } from "./Controls.styled";

const Controls = ({ path, id, minId = 1, maxId = 100 }) => {
	const nextPath = path.replace(":id([0-9]{1,3})", id + 1);
	const prevPath = path.replace(":id([0-9]{1,3})", id - 1);
	
	return (
		<StyledSection>
			{id !== minId && (
				<StyledLink to={prevPath}>
					<Icon icon="long-arrow-alt-left" />
					<Label>previous</Label>
				</StyledLink>
			)}
			{id !== maxId && (
				<StyledLink to={nextPath}>
					<Label>next</Label>
					<Icon icon="long-arrow-alt-right" />
				</StyledLink>
			)}
		</StyledSection>
	);
};

export { Controls };
