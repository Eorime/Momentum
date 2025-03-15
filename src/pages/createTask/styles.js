import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	height: 100%;
	padding-bottom: 400px;
`;

export const CreateTaskContainer = styled.div`
	padding-left: 120px;
	padding-right: 120px;
	padding-top: 140px;
`;

export const CreateTaskTitle = styled.h1`
	font-size: 34px;
	font-family: "Firago";
	font-weight: 600;
	margin-bottom: 30px;
	color: #212529;
`;

export const CreateFormContainer = styled.div`
	background-color: #fdfbff;
	// height: 804px;
	position: relative;
	display: flex;
	gap: 160px;
	padding: 65px 55px;
`;

export const FormASide = styled.div`
	display: flex;
	flex-direction: column;
	gap: 55px;
	width: 550px;
`;

export const FormBSide = styled.div`
	display: flex;
	flex-direction: column;
	gap: 55px;
	width: 550px;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const InputLabel = styled.label`
	font-size: 16px;
	font-family: "Firago";
	font-weight: 400;
	color: #343a40;
	margin-bottom: 6px;
`;

export const Input = styled.input`
	padding: 14px;
	background-color: #ffffff;
	outline: none;
	box-shadow: none;
	border: 1px solid #dee2e6;
	font-size: 14px;
	font-family: "Firago";
	font-weight: 200;
	border-radius: 5px;
	color: #0d0f10;
`;

export const TextArea = styled.textarea`
	height: 133px;
	padding: 14px;
	background-color: #ffffff;
	outline: none;
	box-shadow: none;
	border: 1px solid #dee2e6;
	font-size: 14px;
	font-family: "Firago";
	font-weight: 200;
	border-radius: 5px;
	color: #0d0f10;
	resize: none;
`;

export const FiltersContainer = styled.div`
	display: flex;
	gap: 32px;
	justify-content: space-between;
`;

export const DateInputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 320px;
	margin-top: auto;
`;

export const DateInput = styled.input`
	padding: 14px;
	background-color: #ffffff;
	outline: none;
	box-shadow: none;
	border: 1px solid #dee2e6;
	font-size: 14px;
	font-family: "Firago";
	font-weight: 200;
	border-radius: 5px;
	color: #0d0f10;
`;

export const ValidationsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 4px;
`;

export const Validation = styled.span`
	line-height: 1.3;
	font-size: 10px;
	color: #6c757d;
	font-weight: 200;
`;
