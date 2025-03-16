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
	padding-left: 55px;
	padding-right: 55px;
	padding-top: 65px;
	padding-bottom: 300px;
`;

export const FormASide = styled.div`
	display: flex;
	flex-direction: column;
	gap: 55px;
	width: 550px;
`;

export const FormBSide = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 70px;
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
	opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
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
	font-weight: 200;
	color: ${(props) => {
		if (props.status === "valid") return "#08A508";
		if (props.status === "invalid") return "#FA4D4D";
		return "#6c757d";
	}};
`;

export const Avatar = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
	object-fit: cover;
`;

export const Icon = styled.img`
	width: 16px;
	height: 16px;
	margin-right: 8px;
`;

export const SubmitButton = styled.button`
	position: absolute;
	right: 0;
	bottom: -30%;
	background-color: #8338ec;
	border-radius: 5px;
	padding: 10px 20px;
	font-family: "Firago";
	font-weight: 400;
	color: #ffffff;
	cursor: pointer;
	transition: 0.3s all ease-in-out;
	border: none;

	&:hover {
		background-color: #b588f4;
	}

	&:disabled {
		background-color: #b588f4;
		pointer-events: none;
		cursor: default;
		border: none;
	}
`;
