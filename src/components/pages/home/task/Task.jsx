import React from "react";
import {
	CommentCount,
	CommentIcon,
	CommentsContainer,
	Container,
	Department,
	DepartmentWrapper,
	DueDate,
	EmployeeAvatar,
	EmployeeContainer,
	FiltersContainer,
	PriorityIcon,
	PriorityLabel,
	PriorityWrapper,
	TaskDescription,
	TaskTitle,
	TextContainer,
} from "./styles";

const Task = ({ task }) => {
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
				<PriorityWrapper
					style={{
						borderColor: getPriorityStyle(task.priority.id).border,
						color: getPriorityStyle(task.priority.id).font,
					}}
				>
					<PriorityIcon src={task.priority.icon} />
					<PriorityLabel>{task.priority.name}</PriorityLabel>
				</PriorityWrapper>
				<DepartmentWrapper
					style={{
						backgroundColor: getDepartmentStyle(task.department.id)
							.backgroundColor,
					}}
				>
					<Department>
						{task.department.name.length > 10
							? `${task.department.name.substring(0, 10)}...`
							: task.department.name}
					</Department>
				</DepartmentWrapper>
				<DueDate>{formattedDate}</DueDate>
			</FiltersContainer>
			<TextContainer>
				<TaskTitle>{task.name}</TaskTitle>
				<TaskDescription>
					{task.description?.length > 100
						? `${task.description.substring(0, 100)}...`
						: task.description}
				</TaskDescription>
			</TextContainer>
			<EmployeeContainer>
				<EmployeeAvatar src={task.employee.avatar} />
				<CommentsContainer>
					<CommentIcon
						width="22"
						height="19"
						viewBox="0 0 22 19"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3.08086 0.259766C1.87258 0.259766 0.880859 1.25148 0.880859 2.45977V13.0198C0.880859 14.228 1.87258 15.2198 3.08086 15.2198H4.88211C4.94227 15.7491 4.93539 16.239 4.79961 16.6498C4.63289 17.1551 4.3218 17.5796 3.74086 17.9285C3.57758 18.0316 3.50195 18.2293 3.5518 18.4149C3.60164 18.6005 3.76836 18.7329 3.96086 18.7398C5.82742 18.7398 7.96727 17.7652 9.04836 15.2198H18.9209C20.1291 15.2198 21.1209 14.228 21.1209 13.0198V2.45977C21.1209 1.25148 20.1291 0.259766 18.9209 0.259766H3.08086ZM3.08086 1.13977H18.9209C19.6496 1.13977 20.2409 1.73102 20.2409 2.45977V13.0198C20.2409 13.7485 19.6496 14.3398 18.9209 14.3398H8.80086C8.61695 14.3398 8.45195 14.4549 8.38836 14.6285C7.7043 16.4951 6.48227 17.3837 5.21211 17.7085C5.38398 17.4627 5.54727 17.2032 5.63836 16.9248C5.86695 16.2304 5.84805 15.4707 5.70711 14.6973C5.66758 14.4927 5.49055 14.3432 5.28086 14.3398H3.08086C2.35211 14.3398 1.76086 13.7485 1.76086 13.0198V2.45977C1.76086 1.73102 2.35211 1.13977 3.08086 1.13977Z"
							fill="#212529"
						/>
					</CommentIcon>
					<CommentCount>{task.total_comments}</CommentCount>
				</CommentsContainer>
			</EmployeeContainer>
		</Container>
	);
};

export default Task;
