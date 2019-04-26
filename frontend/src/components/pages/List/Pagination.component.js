import React from "react";
import { pagination } from "./../../../config/constants";
import { Controls } from "./Controls.component";
import { StyledSection, Pages, PageButton } from "./Pagination.styled";

let Pagination = () => (
	<StyledSection>
		<Controls>
			{(currentPage, store) => (
				<Pages>
					{pagination.map(pageNum => (
						<PageButton
							key={`${pageNum}`}
							active={pageNum === currentPage}
							onClick={() => store.setPage(pageNum)}>
							{pageNum}
						</PageButton>
					))}
				</Pages>
			)}
		</Controls>
	</StyledSection>
);

export { Pagination };
