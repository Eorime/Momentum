import React from "react";
import {
	Container,
	EmployeeAvatar,
	FiltersContainer,
	PriorityIcon,
	PriorityLabel,
	PriorityWrapper,
	TaskDescription,
	TaskTitle,
} from "./styles";

const Task = ({ task }) => {
	return (
		<Container>
			<FiltersContainer>
				<PriorityWrapper>
					<PriorityIcon src={task.priority.icon} />
					<PriorityLabel>{task.priority.name}</PriorityLabel>
				</PriorityWrapper>
			</FiltersContainer>
			<p>Department: {task.department.name}</p>

			<EmployeeAvatar src={task.employee.avatar} />
			<TaskDescription>{task.description}</TaskDescription>
			<TaskTitle>{task.name}</TaskTitle>
			<span>{task.due_date}</span>
		</Container>
	);
};

export default Task;
