import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100px;
	top: 0;
	position: fixed;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 120px;
	padding-left: 120px;
	box-sizing: border-box;
	background-color: #ffffff;
	z-index: 2;
`;

export const Logo = styled.img`
	width: 210px;
`;

export const HeaderButtonWrapper = styled.div`
	display: flex;
	gap: 40px;
`;

export const NewEmployeeButton = styled.button`
	color: #212529;
	background-color: #ffffff;
	border: 1px solid #8338ec;
	border-radius: 5px;
	font-size: 16px;
	padding: 10px 20px;
	font-family: "Firago";
	font-weight: 400;
	transition: 0.3s all ease-in-out;
	cursor: pointer;

	&:hover {
		border: 1px solid #b588f4;
	}
`;

export const NewTaskButton = styled.button`
	color: #ffffff;
	background-color: #8338ec;
	border: 1px solid #8338ec;
	border-radius: 5px;
	font-size: 16px;
	padding: 10px 20px;
	font-family: "Firago";
	font-weight: 400;
	transition: 0.3s all ease-in-out;
	cursor: pointer;

	&:hover {
		background-color: #b588f4;
		border: 1px solid #b588f4;
		color: #ffffff;
	}
`;

export const Span = styled.span`
	margin-left: 9px;
`;

export const SvgIcon = styled.svg`
	width: 12px;
	height: 12px;

	& path {
		stroke: white;
		stroke-width: 1.5px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`;
