import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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

//a styled task container component that takes border color as a prop
const TaskWrapper = styled.div`
	border: 1px solid ${(props) => props.borderColor};
	border-radius: 15px;
	background-color: white;
	overflow: hidden;
	margin-bottom: 16px;
	cursor: pointer;
	transition: transform 0.2s ease;

	&:hover {
		transform: translateY(-2px);
	}
`;

const Home = () => {
	const navigate = useNavigate();
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
		setAppliedFilters(filters);
	};

	const handleTaskClick = (taskId) => {
		navigate(`/task/${taskId}`);
	};

	//get the color from the color map
	const getStatusColor = (status) => {
		return statusColorMap[status.name] || statusColorMap.default;
	};

	//group tasks by status id
	const groupTasksByStatus = () => {
		const grouped = {};

		//groups for every status
		statuses.forEach((status) => {
			grouped[status.id] = [];
		});

		//put tasks into their groups
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

	//memoize
	const groupedTasks = React.useMemo(() => {
		return statuses.length > 0 ? groupTasksByStatus() : {};
	}, [filteredTasks, statuses]);

	return (
		<Container>
			<Header />
			<HomeContainer>
				<HomeTitle>დავალებების გვერდი</HomeTitle>
				<Filter updateSelectedFilters={handleFilterUpdate} />
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
