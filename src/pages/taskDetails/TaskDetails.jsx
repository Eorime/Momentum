import React, { useEffect, useState } from "react";
import {
	ASideContainer,
	BSideContainer,
	Container,
	DeadlineContainer,
	DepartmentWrapper,
	DetailsContainer,
	DetailsLabel,
	DetailsTitle,
	EmployeeContainer,
	Icon,
	IconTitleWrapper,
	PriorityContainer,
	PriorityIcon,
	StatusContainer,
	TaskContainer,
	TaskDescription,
	TaskInfo,
	TaskTitle,
	TextContainer,
} from "./styles";
import Header from "../../components/common/header/Header";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../../services/api";
import statusIcon from "../../assets/icons/pie-chart.svg";
import employeeIcon from "../../assets/icons/employee.svg";
import calendarIcon from "../../assets/icons/calendar.svg";

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

	return (
		<Container>
			<Header />
			<TaskContainer>
				{!loading && !error && task && (
					<ASideContainer>
						<DepartmentWrapper>
							<PriorityContainer>
								<PriorityIcon src={task.priority.icon} />
								<TaskInfo>{task.priority?.name}</TaskInfo>
							</PriorityContainer>
							<TaskInfo>{task?.department.name}</TaskInfo>
						</DepartmentWrapper>
						<TextContainer>
							<TaskTitle>{task?.name}</TaskTitle>
							<TaskDescription>{task.description}</TaskDescription>
						</TextContainer>
						<DetailsContainer>
							<DetailsTitle>დავალების დეტალები</DetailsTitle>
							<StatusContainer>
								<IconTitleWrapper>
									<Icon src={statusIcon} />
									<DetailsLabel>სტატუსი</DetailsLabel>
								</IconTitleWrapper>
								<TaskInfo>{task?.status.name}</TaskInfo>
							</StatusContainer>
							<EmployeeContainer>
								<IconTitleWrapper>
									<Icon src={employeeIcon} />
									<DetailsLabel>თანამშრომელი</DetailsLabel>
								</IconTitleWrapper>
								<TaskInfo>
									{task.employee?.name} {""}
									{task.employee?.surname}
								</TaskInfo>
							</EmployeeContainer>
							<DeadlineContainer>
								<IconTitleWrapper>
									<Icon src={calendarIcon} />{" "}
									<DetailsLabel>დავალების ვადა</DetailsLabel>
								</IconTitleWrapper>
								<TaskInfo>{formattedDate}</TaskInfo>
							</DeadlineContainer>
						</DetailsContainer>
					</ASideContainer>
				)}
				<BSideContainer></BSideContainer>
			</TaskContainer>
		</Container>
	);
};

export default TaskDetails;
