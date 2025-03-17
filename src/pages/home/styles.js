import styled from "styled-components";

export const Container = styled.div``;

export const HomeContainer = styled.div`
	padding-left: 120px;
	padding-right: 120px;
	padding-top: 140px;
`;

export const HomeTitle = styled.h1`
	font-size: 34px;
	font-family: "Firago";
	font-weight: 600;
	margin: 0;
	margin-bottom: 52px;
	color: #212529;
`;

export const TaskBoard = styled.div`
	display: flex;
	gap: 52px;
	margin-top: 80px;
	width: 100%;
`;

export const TasksContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
`;

export const StatusColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const ColumnHeader = styled.div`
	border-radius: 10px;
	padding: 15px;
	color: white;
	font-weight: 400;
	font-family: "Firago";
	font-size: 18px;
	text-align: center;
`;

export const NoTasks = styled.div`
	padding: 20px;
	background-color: white;
	border-radius: 8px;
	border: 1px solid #e5e5e5;
	text-align: center;
	color: #888;
`;
