import React, { useEffect, useState } from "react";
import {
	ASideContainer,
	BSideContainer,
	Container,
	DetailsContainer,
	TaskContainer,
	TaskDescription,
	TaskInfo,
	TaskTitle,
	TextContainer,
} from "./styles";
import Header from "../../components/common/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../../services/api";

const TaskDetails = () => {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const formatDateGeorgian = (isoDateString) => {
		const date = new Date(isoDateString);

		const day = date.getDate();

		const year = date.getFullYear();

		const georgianMonths = [
			"იან",
			"თებ",
			"მარ",
			"აპრ",
			"მაი",
			"ივნ",
			"ივლ",
			"აგვ",
			"სექ",
			"ოქტ",
			"ნოე",
			"დეკ",
		];

		const monthAbbr = georgianMonths[date.getMonth()];

		return `${day} ${monthAbbr}, ${year}`;
	};

	const formattedDate = formatDateGeorgian(task?.due_date);

	useEffect(() => {
		const fetchTaskDetails = async () => {
			try {
				setLoading(true);
				const response = await apiService.getTaskById(id);
				setTask(response.data);
			} catch (error) {
				console.log("error", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTaskDetails();
	}, [id]);

	const getStatusColor = (statusName) => {
		return statusColorMap[statusName] || statusColorMap.default;
	};

	return (
		<Container>
			<Header />
			<TaskContainer>
				{!loading && !error && task && (
					<ASideContainer>
						<TaskInfo>{task.priority?.name}</TaskInfo>
						<TaskInfo>{task?.department.name}</TaskInfo>
						<TextContainer>
							<TaskTitle>{task?.name}</TaskTitle>
							<TaskDescription>{task.description}</TaskDescription>
						</TextContainer>
						<DetailsContainer>
							<TaskInfo>{task.status?.name}</TaskInfo>

							<TaskInfo>
								{task.employee?.name} {""}
								{task.employee?.surname}
							</TaskInfo>

							<TaskInfo>{formattedDate}</TaskInfo>
						</DetailsContainer>
					</ASideContainer>
				)}
				<BSideContainer></BSideContainer>
			</TaskContainer>
		</Container>
	);
};

export default TaskDetails;
