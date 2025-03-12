import React from "react";
import { Container, FilterArrow, FilterItem, FilterLabel } from "./styles";

const Filter = () => {
	const filters = ["დეპარტამენტი", "პრიორიტეტი", "თანამშრომელი"];

	return (
		<Container>
			{filters.map((filter, index) => (
				<FilterItem key={index}>
					<FilterLabel>{filter}</FilterLabel>
					<FilterArrow>
						<path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.29289 7.70711C6.68342 8.09763 7.31658 8.09763 7.70711 7.70711L13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893Z" />
					</FilterArrow>
				</FilterItem>
			))}
		</Container>
	);
};

export default Filter;
