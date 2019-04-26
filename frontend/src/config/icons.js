import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faLongArrowAltRight,
	faLongArrowAltLeft,
	faChevronRight,
	faChevronLeft,
	faTimes
} from "@fortawesome/free-solid-svg-icons";

export function initIconLibrary() {
	library.add(
		faLongArrowAltLeft,
		faLongArrowAltRight,
		faChevronRight,
		faChevronLeft,
		faTimes
	);
}
