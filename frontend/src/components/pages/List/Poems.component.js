import React from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { StyledSection, Description } from "./Poems.styled";
import { Card, CardHeader, CardFooter, Matting } from "./../../shared";

let Poems = ({ poems }) => (
	<StyledSection>
		{poems.map((poem, idx) => (
			<Card key={poem.author}>
				<CardHeader>
					<Matting>
						<div>
							{poem.verses.map(verse => <p key={verse}>{verse}</p>)}
						</div>
					</Matting>
				</CardHeader>
				<CardFooter>
					<Description>
						<p>{poem.author}</p>
					 	<Link to={`/${poem.numeral}/`}>Detail</Link>
					</Description>
				</CardFooter>
			</Card>
		))}
	</StyledSection>
);

Poems = inject(provider => ({
	poems: provider.store.listStore.list
}))(observer(Poems));

export { Poems };
