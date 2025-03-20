import React, { useEffect, useState } from "react";
import {
	ASideContainer,
	Avatar,
	BSideContainer,
	Container,
	DeadlineContainer,
	DepartmentContainer,
	DepartmentWrapper,
	DetailsContainer,
	DetailsLabel,
	DetailsTitle,
	DropDownWrapper,
	EmployeeContainer,
	EmployeeDepartment,
	EmployeeWrapper,
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
import { useParams } from "react-router-dom";
import apiService from "../../services/api";
import statusIcon from "../../assets/icons/pie-chart.svg";
import employeeIcon from "../../assets/icons/employee.svg";
import calendarIcon from "../../assets/icons/calendar.svg";
import DropDown from "../../components/common/dropdown/DropDown";
import Comments from "../../components/pages/taskPage/comments/Comments";

const TaskDetails = () => {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [statuses, setStatuses] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState(null);
	const [updating, setUpdating] = useState(false);

	const priorityColors = {
		3: { border: "#FA4D4D", font: "#FA4D4D" },
		2: { border: "#FFBE0B", font: "#FFBE0B" },
		1: { border: "#08A508", font: "#08A508" },
	};

	const getPriorityStyle = (priorityId) => {
		return priorityColors[priorityId] || { border: "#FFBE0B", font: "#212529" }; //default fallback
	};

	const departmentColors = {
		1: { backgroundColor: "#FA4D4D" },
		2: { backgroundColor: "#FF66A8" },
		3: { backgroundColor: "#89B6FF" },
		4: { backgroundColor: "#FD9A6A" },
		5: { backgroundColor: "#89B6FF" },
		6: { backgroundColor: "#FFD86D" },
		7: { backgroundColor: "#FF66A8" },
	};

	const getDepartmentStyle = (departmentId) => {
		return departmentColors[departmentId] || { backgroundColor: "#FFBE0B" };
	};

	const formatDateGeorgian = (isoDateString) => {
		if (!isoDateString) return "";

		const date = new Date(isoDateString);
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		const georgianDays = ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"];

		const dayAbbr = georgianDays[date.getDay()];

		return `${dayAbbr} - ${day}/${month}/${year}`;
	};

	useEffect(() => {
		const fetchTaskDetails = async () => {
			try {
				setLoading(true);
				const response = await apiService.getTaskById(id);
				setTask(response.data);
				setSelectedStatus(response.data.status);
			} catch (error) {
				console.log("error", error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		const fetchStatuses = async () => {
			try {
				const response = await apiService.getStatuses();
				setStatuses(response.data);
			} catch (error) {
				console.log("error fetching statuses", error);
			}
		};

		fetchTaskDetails();
		fetchStatuses();
	}, [id]);

	const handleStatusChange = async (newStatus) => {
		try {
			setUpdating(true);

			const updatedTask = { ...task };

			updatedTask.status = newStatus;

			await apiService.changeTaskStatus(id, { status_id: newStatus.id });

			setSelectedStatus(newStatus);
			setTask(updatedTask);
		} catch (error) {
			console.log("error updating status", error);
		} finally {
			setUpdating(false);
		}
	};

	return (
		<Container>
			<Header />
			<TaskContainer>
				{!loading && !error && task && (
					<ASideContainer>
						<DepartmentContainer>
							<PriorityContainer
								style={{
									borderColor: getPriorityStyle(task.priority.id).border,
									color: getPriorityStyle(task.priority.id).font,
								}}
							>
								<PriorityIcon src={task.priority.icon} />
								<TaskInfo>{task.priority?.name}</TaskInfo>
							</PriorityContainer>
							<DepartmentWrapper
								style={{
									backgroundColor: getDepartmentStyle(task.department.id)
										.backgroundColor,
								}}
							>
								<TaskInfo>{task?.department.name}</TaskInfo>
							</DepartmentWrapper>
						</DepartmentContainer>
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
								{task.status && (
									<DropDownWrapper>
										<DropDown
											options={statuses}
											value={selectedStatus}
											onSelect={handleStatusChange}
											disabled={updating}
											placeholder="აირჩიეთ სტატუსი"
										/>
									</DropDownWrapper>
								)}
							</StatusContainer>
							<EmployeeContainer>
								<IconTitleWrapper>
									<Icon src={employeeIcon} />
									<DetailsLabel>თანამშრომელი</DetailsLabel>
								</IconTitleWrapper>
								<EmployeeWrapper>
									<Avatar src={task.employee?.avatar} />
									<div style={{ display: "flex", flexDirection: "column" }}>
										<EmployeeDepartment>
											{task?.department.name}
										</EmployeeDepartment>
										<TaskInfo>
											{task.employee?.name} {""} {task.employee?.surname}
										</TaskInfo>
									</div>
								</EmployeeWrapper>
							</EmployeeContainer>
							<DeadlineContainer>
								<IconTitleWrapper>
									<Icon src={calendarIcon} />{" "}
									<DetailsLabel>დავალების ვადა</DetailsLabel>
								</IconTitleWrapper>
								<TaskInfo>{formatDateGeorgian(task?.due_date)}</TaskInfo>
							</DeadlineContainer>
						</DetailsContainer>
					</ASideContainer>
				)}
				<BSideContainer>
					<Comments />
				</BSideContainer>
			</TaskContainer>
		</Container>
	);
};

export default TaskDetails;
