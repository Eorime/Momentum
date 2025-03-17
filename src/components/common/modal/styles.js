import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100vh;
	background-color: rgba(13, 15, 16, 0.15);
	backdrop-filter: blur(5px);
	position: absolute;
	inset: 0;
	z-index: 9;
`;

export const ModalContainer = styled.div`
	position: relative;
	width: 913px;
	height: 500px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -65%);
	background-color: white;
	padding-top: 117px;
	padding-left: 50px;
	padding-right: 50px;
	padding-bottom: 60px;
	border-radius: 10px;
	z-index: 10;
`;

export const SVGWrapper = styled.svg`
	cursor: pointer;
	width: 40px;
	height: 40px;
	position: absolute;
	right: 50px;
	top: 40px;
`;
