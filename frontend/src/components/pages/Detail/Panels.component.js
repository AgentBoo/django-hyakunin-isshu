import React, { Fragment } from "react";
import { inject, observer } from "mobx-react";
import { Complement } from "./Complement.component";
import { Controls } from "./Controls.component";
import { Original } from "./Original.component";
import { Romaji } from "./Romaji.component";
import { Translations } from "./Translations.component";
import { StartColumn, CoreColumn, EndColumn } from "./Panels.styled";

let Panels = ({ poem, id, path }) => {
	if (!poem) {
		return null;
	} else {
		return (
			<Fragment>
				<StartColumn>
					<Complement poem={poem} />
					<Controls id={id} path={path} />
				</StartColumn>
				<CoreColumn>
					<Original key="jap" poem={poem.jap} />
				</CoreColumn>
				<EndColumn>
					<Romaji key="rom" poem={poem.rom} />
					<Translations key="eng" translations={poem.translations} />
				</EndColumn>
			</Fragment>
		);
	}
};

Panels = inject(provider => ({
	poem: provider.store.detailStore.poem
}))(observer(Panels));

export { Panels };
