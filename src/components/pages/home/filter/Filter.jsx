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
	FilterAvatar,
	FilterButton,
	FilterButtonWrapper,
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

	const [appliedFilters, setAppliedFilters] = useState({
		departments: [],
		priorities: [],
		employees: [],
	});

	//not yet applied filters
	const [pendingFilters, setPendingFilters] = useState({
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
		let updatedFilters = { ...pendingFilters };

		if (activeFilter === 0) {
			const isSelected = pendingFilters.departments.some(
				(item) => item.id === option.id
			);

			updatedFilters = {
				...pendingFilters,
				departments: isSelected
					? pendingFilters.departments.filter((item) => item.id !== option.id)
					: [...pendingFilters.departments, option],
			};
		} else if (activeFilter === 1) {
			const isSelected = pendingFilters.priorities.some(
				(item) => item.id === option.id
			);

			updatedFilters = {
				...pendingFilters,
				priorities: isSelected
					? pendingFilters.priorities.filter((item) => item.id !== option.id)
					: [...pendingFilters.priorities, option],
			};
		} else if (activeFilter === 2) {
			const isSelected = pendingFilters.employees.some(
				(item) => item.id === option.id
			);

			updatedFilters = {
				...pendingFilters,
				employees: isSelected ? [] : [option],
			};
		}

		//update pending filters
		setPendingFilters(updatedFilters);
	};

	//apply all filters when clicked
	const handleApplyAllFilters = () => {
		//update filters
		setAppliedFilters(pendingFilters);

		//send updated filters to parent
		if (updateSelectedFilters) {
			console.log("Sending updated filters to parent:", pendingFilters);
			updateSelectedFilters(pendingFilters);
		}

		//close dropdown after applying
		setActiveFilter(null);
	};

	React.useEffect(() => {
		setPendingFilters(appliedFilters);
	}, []);

	const isOptionSelected = (option) => {
		if (activeFilter === 0) {
			return pendingFilters.departments.some((item) => item.id === option.id);
		} else if (activeFilter === 1) {
			return pendingFilters.priorities.some((item) => item.id === option.id);
		} else if (activeFilter === 2) {
			return pendingFilters.employees.some((item) => item.id === option.id);
		}
		return false;
	};

	const shouldShowAvatar = () => {
		return activeFilter === 2;
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
								<>
									{shouldShowAvatar() && option.avatar && (
										<FilterAvatar src={option.avatar} alt={option.name} />
									)}
									{option.name} {option.surname || ""}
								</>
							</FilterOptionLabel>
						</FilterOptionWrapper>
					))}

					<FilterButtonWrapper>
						<FilterButton onClick={handleApplyAllFilters}>ფილტრი</FilterButton>
					</FilterButtonWrapper>
				</FilterOptions>
			)}
		</Container>
	);
};

export default Filter;
