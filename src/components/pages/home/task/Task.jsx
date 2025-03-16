import React from "react";
import {
	Container,
	Department,
	DueDate,
	EmployeeAvatar,
	FiltersContainer,
	PriorityIcon,
	PriorityLabel,
	PriorityWrapper,
	TaskDescription,
	TaskTitle,
	TextContainer,
} from "./styles";

const Task = ({ task }) => {
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

	const formattedDate = formatDateGeorgian(task.due_date);

	return (
		<Container>
			<FiltersContainer>
				<PriorityWrapper>
					<PriorityIcon src={task.priority.icon} />
					<PriorityLabel>{task.priority.name}</PriorityLabel>
				</PriorityWrapper>
				<Department>{task.department.name}</Department>
				<DueDate>{formattedDate}</DueDate>
			</FiltersContainer>
			<TextContainer>
				<TaskTitle>{task.name}</TaskTitle>
				<TaskDescription>{task.description}</TaskDescription>
			</TextContainer>
			<EmployeeAvatar src={task.employee.avatar} />
		</Container>
	);
};

export default Task;
