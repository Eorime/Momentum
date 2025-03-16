import styled from "styled-components";

export const Container = styled.div`
	position: relative;
	width: 380px;
	height: 217px;
	display: flex;
	gap: 28px;
	padding: 20px;
	flex-direction: column;
	border: solid 1px #ffbe0b;
	border-radius: 15px;
`;

export const FiltersContainer = styled.div`
	display: flex;
	flex-direction: row;
`;

export const TextContainer = styled.div``;

export const TaskTitle = styled.h1`
	font-family: "Firago";
	font-size: 15px;
	font-weight: 500;
`;

export const TaskDescription = styled.p`
	font-family: "Firago";
	font-size: 14px;
	font-weight: 300;
`;

export const EmployeeContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const PriorityWrapper = styled.div`
	display: flex;
	gap: 4px;
	font-family: "Firago";
	font-weight: 500;
	border: solid 0.5px #ffbe0b;
	border-radius: 4px;
	padding: 4px 6px;
`;

export const PriorityLabel = styled.span``;

export const PriorityIcon = styled.img`
	width: 16px;
`;

export const EmployeeAvatar = styled.img`
	position: absolute;
	bottom: 10px;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
	object-fit: cover;
`;

export const DueDate = styled.span`
	font-family: "Firago";
	font-size: 12px;
	font-weight: 400;
`;

export const Department = styled.div`
	font-family: "Firago";
	font-size: 12px;
	font-weight: 400;
`;
