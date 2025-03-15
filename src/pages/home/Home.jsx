import React, { useEffect, useState } from "react";
import { Container, HomeContainer, HomeTitle } from "./styles";
import apiService from "../../services/api";
import Header from "../../components/common/header/Header";
import Filter from "../../components/pages/home/filter/Filter";

const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [appliedFilters, setAppliedFilters] = useState({
		departments: [],
		priorities: [],
		employees: [],
	});

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await apiService.getTasks();
				setTasks(response.data);
				setFilteredTasks(response.data);
			} catch (error) {
				console.error("Error fetching tasks:", error);
				console.log("couldnt fetch ;(");
			}
		};

		fetchTasks();
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

	return (
		<Container>
			<Header />
			<HomeContainer>
				<HomeTitle>დავალებების გვერდი</HomeTitle>
				<Filter updateSelectedFilters={handleFilterUpdate} />

				<div>
					{filteredTasks.length > 0 ? (
						filteredTasks.map((task) => <div key={task.id}>{task.name}</div>)
					) : (
						<div>no tasks </div>
					)}
				</div>
			</HomeContainer>
		</Container>
	);
};

export default Home;
