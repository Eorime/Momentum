import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	ChosenFilter,
	ChosenFiltersContainer,
	ChosenFiltersWrapper,
	ClearAllButton,
	CloseButton,
	ColumnHeader,
	Container,
	FilterWithCloseButton,
	HomeContainer,
	HomeTitle,
	NoTasks,
	StatusColumn,
	TaskBoard,
	TasksContainer,
} from "./styles";
import apiService from "../../services/api";
import Header from "../../components/common/header/Header";
import Filter from "../../components/pages/home/filter/Filter";
import Task from "../../components/pages/home/task/Task";
import styled from "styled-components";

const TaskWrapper = styled.div`
	border: 1px solid ${(props) => props.borderColor};
	border-radius: 15px;
	background-color: white;
	overflow: hidden;
	margin-bottom: 30px;
	cursor: pointer;
	transition: 0.2s all ease-in-out;

	&:hover {
		border: 1px solid
			${(props) => (props.borderColor ? `${props.borderColor}6D` : "")};
	}
`;

//localstorage key
const FILTERS_STORAGE_KEY = "homePageAppliedFilters";
//sessionstorage key
const LAST_PATH_KEY = "lastViewedPath";

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [statuses, setStatuses] = useState([]);
	const [appliedFilters, setAppliedFilters] = useState({
		departments: [],
		priorities: [],
		employees: [],
	});

	const statusColorMap = {
		დასაწყები: "#F7BC30",
		პროგრესში: "#FB5607",
		"მზად ტესტირებისთვის": "#FF006E",
		დასრულებული: "#3A86FF",
		default: "#6c757d",
	};

	//check if its refresh
	useEffect(() => {
		const lastPath = sessionStorage.getItem(LAST_PATH_KEY);
		const currentPath = location.pathname;

		//if theres no lastPath or it's different from current path, it's a new navigation
		if (!lastPath || lastPath !== currentPath) {
			//clear filters if coming from a different path
			if (lastPath) {
				localStorage.removeItem(FILTERS_STORAGE_KEY);
			}
		}

		//update the last path
		sessionStorage.setItem(LAST_PATH_KEY, currentPath);

		//load existing filters from localstorage
		const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
		if (savedFilters) {
			try {
				setAppliedFilters(JSON.parse(savedFilters));
			} catch (e) {
				//reset filters if parsing fails
				setAppliedFilters({
					departments: [],
					priorities: [],
					employees: [],
				});
			}
		}

		//add a beforeunload event listener to detect page reload
		const handleBeforeUnload = () => {
			//set a flag to indicate page refresh
			sessionStorage.setItem("isRefresh", "true");
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);

			//check if user's navigating away or refreshing
			const isRefresh = sessionStorage.getItem("isRefresh") === "true";

			if (!isRefresh) {
				//if not refreshing, clear filters when leaving the page
				localStorage.removeItem(FILTERS_STORAGE_KEY);
			}

			//clear the refresh flag
			sessionStorage.removeItem("isRefresh");
		};
	}, [location.pathname]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//fetch tasks
				const tasksResponse = await apiService.getTasks();
				setTasks(tasksResponse.data);
				setFilteredTasks(tasksResponse.data);

				//fetch statuses
				const statusesResponse = await apiService.getStatuses();
				setStatuses(statusesResponse.data);
			} catch (error) {
				console.error("Error fetching data:", error);
				console.log("Couldn't fetch data ;(");
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (tasks.length > 0) {
			applyFilters();
		}

		//save to localStorage when filters change
		if (Object.values(appliedFilters).some((filter) => filter.length > 0)) {
			localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(appliedFilters));
		} else {
			localStorage.removeItem(FILTERS_STORAGE_KEY);
		}
	}, [appliedFilters, tasks]);

	const applyFilters = () => {
		let result = [...tasks];

		if (appliedFilters.departments.length > 0) {
			result = result.filter((task) =>
				appliedFilters.departments.some(
					(dept) => dept.id === task.department.id
				)
			);
		}

		if (appliedFilters.priorities.length > 0) {
			result = result.filter((task) =>
				appliedFilters.priorities.some(
					(priority) => priority.id === task.priority.id
				)
			);
		}

		if (appliedFilters.employees.length > 0) {
			result = result.filter(
				(task) => task.employee.id === appliedFilters.employees[0].id
			);
		}

		setFilteredTasks(result);
	};

	const handleFilterUpdate = (filters) => {
		console.log("handleFilterUpdate called with:", filters);
		setAppliedFilters(filters);
	};

	//clear all filters
	const handleClearAllFilters = () => {
		const emptyFilters = {
			departments: [],
			priorities: [],
			employees: [],
		};
		setAppliedFilters(emptyFilters);
		localStorage.removeItem(FILTERS_STORAGE_KEY);
	};

	//remove a single filter
	const handleRemoveFilter = (filterType, filterId) => {
		const updatedFilters = {
			...appliedFilters,
			[filterType]: appliedFilters[filterType].filter(
				(filter) => filter.id !== filterId
			),
		};
		setAppliedFilters(updatedFilters);
	};

	const handleTaskClick = (taskId) => {
		//clear filters when navigating to a task detail page
		localStorage.removeItem(FILTERS_STORAGE_KEY);
		navigate(`/task/${taskId}`);
	};

	const getStatusColor = (status) => {
		return statusColorMap[status.name] || statusColorMap.default;
	};

	const groupTasksByStatus = () => {
		const grouped = {};

		statuses.forEach((status) => {
			grouped[status.id] = [];
		});

		filteredTasks.forEach((task) => {
			const statusId = task.status?.id;
			if (statusId && grouped[statusId]) {
				grouped[statusId].push(task);
			} else if (statuses.length > 0) {
				grouped[statuses[0].id].push(task);
			}
		});

		return grouped;
	};

	const groupedTasks = React.useMemo(() => {
		return statuses.length > 0 ? groupTasksByStatus() : {};
	}, [filteredTasks, statuses]);

	//check if any filters are applied
	const hasFilters = Object.values(appliedFilters).some(
		(filters) => filters.length > 0
	);

	return (
		<Container>
			<Header />
			<HomeContainer>
				<HomeTitle>დავალებების გვერდი</HomeTitle>
				<Filter
					updateSelectedFilters={handleFilterUpdate}
					initialFilters={appliedFilters}
				/>

				{hasFilters && (
					<>
						<ChosenFiltersContainer>
							<ChosenFiltersWrapper>
								{Object.entries(appliedFilters).map(([filterType, filters]) =>
									filters.map((filter) => (
										<FilterWithCloseButton key={`${filterType}-${filter.id}`}>
											{filterType === "employees"
												? `${filter.name} ${filter.surname}`
												: filter.name}
											<CloseButton
												onClick={() =>
													handleRemoveFilter(filterType, filter.id)
												}
											>
												✕
											</CloseButton>
										</FilterWithCloseButton>
									))
								)}
							</ChosenFiltersWrapper>
							<ClearAllButton onClick={handleClearAllFilters}>
								გასუფთავება
							</ClearAllButton>
						</ChosenFiltersContainer>
					</>
				)}

				<TaskBoard>
					{statuses.map((status) => (
						<StatusColumn
							key={status.id}
							style={{
								flex: 1,
								width: `${100 / statuses.length}%`,
							}}
						>
							<ColumnHeader
								style={{
									backgroundColor: getStatusColor(status),
								}}
							>
								{status.name}
							</ColumnHeader>

							<TasksContainer>
								{groupedTasks[status.id] &&
								groupedTasks[status.id].length > 0 ? (
									groupedTasks[status.id].map((task) => (
										<TaskWrapper
											key={task.id}
											borderColor={getStatusColor(status)}
											onClick={() => handleTaskClick(task.id)}
										>
											<Task task={task} />
										</TaskWrapper>
									))
								) : (
									<NoTasks>No tasks</NoTasks>
								)}
							</TasksContainer>
						</StatusColumn>
					))}
				</TaskBoard>
			</HomeContainer>
		</Container>
	);
};

export default Home;
