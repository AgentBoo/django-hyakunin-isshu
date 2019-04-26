import React, { Fragment } from "react";
import { Warning } from "./Page.styled";
import { Header, Main } from "./../../shared";

const NotFound = () => (
	<Fragment>
		<Header />
		<Main>
			<Warning>Uh oh, this page doesn't exist!</Warning>
		</Main>
	</Fragment>
);

export default NotFound;
