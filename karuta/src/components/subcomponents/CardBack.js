// @flow
// react
import React from "react";
// router
import { Link } from "react-router-dom";

type Props = {
	poem: {
		id: number,
		[string]: {
			author: string,
			verses: string[]
		}
	},
	locale: string,
	onClick: () => void
};

const CardBack = (props: Props) => {
	const handleClick = (event: SyntheticEvent<>) => {
		event.stopPropagation();
		return props.onClick();
	};
	const { locale, poemId, author } = props;

	return (
		<section
			className={locale === "jap" ? "card-back jp-vertical" : "card-back"}
			onClick={handleClick}>
			<Link
				className={locale === "jap" ? "link" : "link-underlined"}
				to={`/detail/${poemId}`}>
				{author}
			</Link>
		</section>
	);
};

export default CardBack;
