import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
	ChosenFilter,
	ChosenFiltersContainer,
	ColumnHeader,
	Container,
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

	//load filters from local storage on mount
	useEffect(() => {
		const savedFilters = localStorage.getItem("appliedFilters");
		if (savedFilters) {
			setAppliedFilters(JSON.parse(savedFilters));
		}

		//clean up storage after moving to a diff page
		return () => {
			const isRefresh =
				sessionStorage.getItem("currentPath") === location.pathname;
			if (!isRefresh) {
				localStorage.removeItem("appliedFilters");
			}
		};
	}, [location.pathname]);

	//current path setup
	useEffect(() => {
		sessionStorage.setItem("currentPath", location.pathname);
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

		//save to local storage when filters change
		if (Object.values(appliedFilters).some((filter) => filter.length > 0)) {
			localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters));
		} else {
			localStorage.removeItem("appliedFilters");
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

	const handleTaskClick = (taskId) => {
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

	return (
		<Container>
			<Header />
			<HomeContainer>
				<HomeTitle>დავალებების გვერდი</HomeTitle>
				<Filter
					updateSelectedFilters={handleFilterUpdate}
					initialFilters={appliedFilters}
				/>
				<ChosenFiltersContainer>
					{Object.entries(appliedFilters).map(([filterType, filters]) =>
						filters.map((filter) => (
							<ChosenFilter key={`${filterType}-${filter.id}`}>
								{filterType === "employees"
									? `${filter.name} ${filter.surname}`
									: filter.name}
							</ChosenFilter>
						))
					)}
				</ChosenFiltersContainer>
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
