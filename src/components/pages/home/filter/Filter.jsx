import React, { useState } from "react";
import {
	Container,
	FilterArrow,
	FilterContainer,
	FilterItem,
	FilterLabel,
	FilterOptions,
} from "./styles";
import apiService from "../../../../services/api";

const Filter = () => {
	const filters = [
		{
			label: "დეპარტამენტი",
			fetch: apiService.getDepartments,
		},
		{
			label: "პრიორიტეტი",
			fetch: apiService.getPriorities,
		},
		{
			label: "თანამშრომელი",
			fetch: apiService.getEmployees,
		},
	];

	const [activeFilter, setActiveFilter] = useState(null);
	const [filterOptions, setFilterOptions] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState({
		departments: [],
		priorities: [],
		employees: [],
	});

	const handleFilterClick = async (index) => {
		//allows filter toggle
		if (activeFilter === index) {
			setActiveFilter(null);
			return;
		}

		setActiveFilter(index);

		try {
			const response = await filters[index].fetch();
			setFilterOptions(response.data);
		} catch (error) {
			console.log("error fetching");
			setFilterOptions([]);
		}
	};

	return (
		<Container>
			<FilterContainer>
				{filters.map((filter, index) => (
					<FilterItem key={index}>
						<FilterLabel>{filter.label}</FilterLabel>
						<FilterArrow>
							<path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.29289 7.70711C6.68342 8.09763 7.31658 8.09763 7.70711 7.70711L13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893Z" />
						</FilterArrow>
					</FilterItem>
				))}
			</FilterContainer>
			<FilterOptions></FilterOptions>
		</Container>
	);
};

export default Filter;
