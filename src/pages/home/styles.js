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
`;

export const StatusColumn = styled.div`
	display: flex;
	flex-direction: column;
	gap: 30px;
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

export const ChosenFiltersWrapper = styled.div`
	display: flex;
	gap: 8px;
	width: auto;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;

	scrollbar-color: #b588f4 transparent;

	&::-webkit-scrollbar {
		height: 5px;
	}

	&::-webkit-scrollbar-track {
		background: #b588f4;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		display: none;
	}
`;

export const ChosenFiltersContainer = styled.div`
	height: 30px;
	width: 1000px;
	margin-top: 25px;
	position: absolute;
	display: flex;
	align-items: center;
`;

export const ChosenFilter = styled.div`
	font-family: "Firago";
	font-weight: 200;
	font-size: 14px;
	color: #343a40;
	padding: 6px 10px;
	border: 1px solid #ced4da;
	border-radius: 43px;
	white-space: nowrap;
	flex-shrink: 0;
`;

export const ClearAllButton = styled.button`
	background: none;
	border: none;
	padding: 6px 10px;
	margin-left: 8px;
	cursor: pointer;
	font-size: 14px;
	color: #343a40;
	transition: 0.2s ease-in-out;
	font-family: "Firago";
	font-weight: 200;

	&:hover {
		color: #fa4d4d;
	}
`;

export const FilterWithCloseButton = styled(ChosenFilter)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
`;

export const CloseButton = styled.span`
	cursor: pointer;
	font-size: 14px;
	font-weight: bold;
	opacity: 0.6;
	&:hover {
		opacity: 1;
	}
`;
