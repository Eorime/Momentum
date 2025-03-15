import React, { useState } from "react";
import {
	Container,
	FilterArrow,
	FilterContainer,
	FilterItem,
	FilterLabel,
	FilterOptionCheck,
	FilterOptionLabel,
	FilterOptions,
	FilterOptionWrapper,
} from "./styles";
import apiService from "../../../../services/api";

const Filter = ({ updateSelectedFilters }) => {
	const filters = [
		{
			label: "დეპარტამენტი",
			fetch: apiService.getDepartments,
			multiSelect: true,
		},
		{
			label: "პრიორიტეტი",
			fetch: apiService.getPriorities,
			multiSelect: true,
		},
		{
			label: "თანამშრომელი",
			fetch: apiService.getEmployees,
			multiSelect: false,
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

	const handleOptionSelect = (option) => {
		let updatedFilters = { ...selectedFilters };

		if (activeFilter === 0) {
			const isSelected = selectedFilters.departments.some(
				(item) => item.id === option.id
			);

			updatedFilters = {
				...selectedFilters,
				departments: isSelected
					? selectedFilters.departments.filter((item) => item.id !== option.id)
					: [...selectedFilters.departments, option],
			};
		} else if (activeFilter === 1) {
			const isSelected = selectedFilters.priorities.some(
				(item) => item.id === option.id
			);

			updatedFilters = {
				...selectedFilters,
				priorities: isSelected
					? selectedFilters.priorities.filter((item) => item.id !== option.id)
					: [...selectedFilters.priorities, option],
			};
		} else if (activeFilter === 2) {
			const isSelected = selectedFilters.employees.some(
				(item) => item.id === option.id
			);

			updatedFilters = {
				...selectedFilters,
				employees: isSelected ? [] : [option],
			};
		}

		//local state update
		setSelectedFilters(updatedFilters);
		console.log(updatedFilters);

		//send updated filters to the parent component
		if (updateSelectedFilters) {
			updateSelectedFilters(updatedFilters);
		}
	};

	const isOptionSelected = (option) => {
		if (activeFilter === 0) {
			return selectedFilters.departments.some((item) => item.id === option.id);
		} else if (activeFilter === 1) {
			return selectedFilters.priorities.some((item) => item.id === option.id);
		} else if (activeFilter === 2) {
			return selectedFilters.employees.some((item) => item.id === option.id);
		}
		return false;
	};

	return (
		<Container>
			<FilterContainer>
				{filters.map((filter, index) => (
					<FilterItem
						key={index}
						onClick={() => handleFilterClick(index)}
						active={activeFilter === index ? "true" : "false"}
					>
						<FilterLabel active={activeFilter === index ? "true" : "false"}>
							{filter.label}
						</FilterLabel>
						<FilterArrow active={activeFilter === index ? "true" : "false"}>
							<svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
								<path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.29289 7.70711C6.68342 8.09763 7.31658 8.09763 7.70711 7.70711L13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893Z" />
							</svg>
						</FilterArrow>
					</FilterItem>
				))}
			</FilterContainer>

			{activeFilter !== null && (
				<FilterOptions>
					{filterOptions.map((option) => (
						<FilterOptionWrapper key={option.id}>
							<FilterOptionCheck
								type="checkbox"
								id={`option-${option.id}`}
								checked={isOptionSelected(option)}
								onChange={() => handleOptionSelect(option)}
							/>
							<FilterOptionLabel htmlFor={`option-${option.id}`}>
								{option.name} {option.surname}
							</FilterOptionLabel>
						</FilterOptionWrapper>
					))}
				</FilterOptions>
			)}
		</Container>
	);
};

export default Filter;
