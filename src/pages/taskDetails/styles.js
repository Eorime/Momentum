import styled from "styled-components";

export const Container = styled.div``;

export const TaskContainer = styled.div`
	margin-top: 30px;
	background-color: white;
	padding: 120px;
	display: flex;
	gap: 220px;
	color: #212529;
`;

export const ASideContainer = styled.div`
	width: 715px;
`;

export const BSideContainer = styled.div`
	background-color: #faf7fe;
	width: 740px;
	border-radius: 10px;
	padding: 40px 45px;
	margin-top: 20px;
	max-height: 700px;
	overflow-y: auto;
	position: relative;
	gap: 200px;
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

export const TaskTitle = styled.h1`
	font-family: "Firago";
	font-weight: 500;
	font-size: 34px;
	margin: 0;
`;

export const TaskDescription = styled.p`
	font-family: "Firago";
	font-weight: 300;
	margin: 0;
	margin-top: 26px;
`;

export const TaskInfo = styled.div`
	font-family: "Firago";
	font-weight: 400;
`;

export const DepartmentContainer = styled.div`
	display: flex;
	gap: 18px;
	margin-bottom: 12px;
	align-items: center;
`;

export const DepartmentWrapper = styled.div`
	border-radius: 15px;
	padding: 5px 18px;
	color: #ffffff;
`;

export const PriorityIcon = styled.img`
	width: 16px;
`;

export const PriorityContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	font-family: "Firago";
	font-weight: 500;
	border: solid 0.5px;
	border-radius: 4px;
	padding: 4px 8px;
`;

export const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
    color #2A2A2A;
	width: 500px;
	margin-top: 63px;
`;

export const DetailsTitle = styled.h1`
	font-family: "Firago";
	font-weight: 500;
	font-size: 24px;
	color: #2a2a2a;
`;

export const StatusContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 24px;
`;

export const EmployeeContainer = styled.div`
	display: flex;
	gap: 43px;
	margin-bottom: 24px;
`;

export const DeadlineContainer = styled.div`
	display: flex;
	gap: 43px;
	align-items: center;
`;

export const IconTitleWrapper = styled.div`
	display: flex;
	gap: 10px;
	align-items: center;
`;

export const DetailsLabel = styled.span`
	font-family: "Firago";
	font-weight: 400;
	font-size: 16px;
	color: #474747;
`;

export const Icon = styled.img`
	width: 24px;
	height: 24px;
`;

export const Avatar = styled.img`
	width: 32px;
	height: 32px;
	border-radius: 50%;
	margin-right: 12px;
	object-fit: cover;
`;

export const EmployeeWrapper = styled.div`
	display: flex;
	align-items: center;
`;

export const EmployeeDepartment = styled.span`
	font-family: "Firago";
	font-size: 11px;
	font-weight: 200;
	color: #474747;
`;

export const DropDownWrapper = styled.div`
	width: 270px;
	padding-right: 30px;
`;
