import React, { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { Poem } from "./../toolbox";

let DetailTranslations = ({ translations }) => {
	const style = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } });

	return (
		<animated.div style={style}>
			{translations &&
				translations.map(t => <Poem key={t.author} poem={t} />)}
		</animated.div>
	);
};

DetailTranslations.defaultProps = {
	translations: []
};

export { DetailTranslations };
