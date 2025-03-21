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
	max-width: 913px;
	max-height: 766px;
	top: 55%;
	left: 50%;
	transform: translate(-50%, -65%);
	background-color: white;
	padding-top: 117px;
	padding-left: 50px;
	padding-right: 50px;
	padding-bottom: 60px;
	border-radius: 10px;
	z-index: 12;
	display: flex;
	flex-direction: column;
	gap: 45px;
`;

export const SVGWrapper = styled.svg`
	cursor: pointer;
	width: 40px;
	height: 40px;
	position: absolute;
	right: 50px;
	top: 40px;
`;

export const ModalName = styled.h1`
	margin: 0;
	color: #212529;
	font-family: "Firago";
	font-weight: 500;
	font-size: 32px;
	text-align: center;
`;

export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 45px;
`;

export const TopSideWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const InputLabel = styled.span`
	color: #343a40;
	font-family: "Firago";
	font-weight: 500;
	font-size: 14px;
`;

export const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 3px;
	width: 384px;
`;

export const Input = styled.input`
	padding: 14px;
	background-color: #ffffff;
	outline: none;
	box-shadow: none;
	border: 1px solid #ced4da;
	border-color: ${(props) => {
		if (props.status === "valid") return "#08A508";
		if (props.status === "invalid") return "#FA4D4D";
		return "#ced4da";
	}};
	font-size: 14px;
	font-family: "Firago";
	font-weight: 200;
	border-radius: 6px;
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

export const ButtonWrapper = styled.div`
	display: flex;
	gap: 22px;
	position: relative;
	left: 59%;
`;

export const AvatarInputWrapper = styled.div`
	width: 813px;
`;

export const AvatarInput = styled.div`
	height: 120px;
	border: 1px dashed #ced4da;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	width: 111%;
`;

export const AvatarIconWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 7px;
`;

export const AvatarLabel = styled.span`
	color: #343a40;
	font-family: "Firago";
	font-weight: 500;
	font-size: 14px;
`;

export const AvatarIcon = styled.img`
	width: 24px;
	height: 24px;
`;

export const CancelButton = styled.button`
	font-family: "Firago";
	font-weight: 300;
	font-size: 16px;
	color: #343a40;
	background-color: #ffffff;
	border: 1px solid #8338ec;
	border-radius: 5px;
	font-size: 16px;
	padding: 11px 16px;
	transition: 0.3s all ease-in-out;
	cursor: pointer;

	&:hover {
		border: 1px solid #b588f4;
	}
`;

export const SubmitButton = styled.button`
	color: #ffffff;
	background-color: #8338ec;
	border: 1px solid #8338ec;
	opacity: ${({ invalid }) => (invalid ? 0.5 : 1)};
	border-radius: 5px;
	font-size: 16px;
	padding: 10px 20px;
	font-family: "Firago";
	font-weight: 300;
	transition: 0.3s all ease-in-out;
	cursor: pointer;
	cursor: ${({ invalid }) => (invalid ? "default" : "pointer")};

	&:hover {
		${({ invalid }) =>
			!invalid &&
			`
      background-color: #b588f4;
      border: 1px solid #b588f4;
    `}
		color: #ffffff;
	}
`;

export const AvatarPreview = styled.img`
	width: 88px;
	height: 88px;
	border-radius: 50%;
	object-fit: cover;
`;

export const BinSvg = styled.svg`
	width: 24px;
	height: 24px;
	position: absolute;
	right: -3px;
	top: 65px;
`;
