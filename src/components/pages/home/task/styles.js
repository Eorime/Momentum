import styled from "styled-components";

export const Container = styled.div`
	position: relative;
	max-width: 380px;
	display: flex;
	gap: 28px;
	padding: 20px;
	flex-direction: column;
	color: #212529;
	justify-content: space-between;
`;

export const FiltersContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const TextContainer = styled.div``;

export const TaskTitle = styled.h1`
	font-family: "Firago";
	font-size: 15px;
	font-weight: 500;
	margin: 0;
	margin-bottom: 12px;
`;

export const TaskDescription = styled.p`
	font-family: "Firago";
	font-size: 14px;
	font-weight: 300;
	margin: 0;
`;

export const EmployeeContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
`;

export const PriorityWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	font-family: "Firago";
	font-weight: 500;
	border: solid 0.5px;
	border-radius: 4px;
	padding: 4px 6px;
`;

export const PriorityLabel = styled.span`
	font-size: 12px;
	font-family: "Firago";
	font-weight: 500;
`;

export const PriorityIcon = styled.img`
	width: 16px;
`;

export const EmployeeAvatar = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
	object-fit: cover;
`;

export const DueDate = styled.span`
	font-family: "Firago";
	font-size: 12px;
	font-weight: 200;
`;

export const Department = styled.div`
	font-family: "Firago";
	font-size: 12px;
	font-weight: 400;
`;

export const CommentsContainer = styled.div`
	display: flex;
	gap: 4px;
	align-items: center;
`;

export const CommentIcon = styled.svg`
	width: 20px;
	height: 20px;
	bottom: 25px;
	right: 20px;
	color: #6c757d;
`;

export const CommentCount = styled.span`
	font-family: "Firago";
	font-size: 14px;
	font-weight: 300;
`;
