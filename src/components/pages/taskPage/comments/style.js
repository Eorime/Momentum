import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 60px;
`;

export const CommentAreaWrapper = styled.div`
	background-color: #ffffff;
	border: 1px solid #adb5bd;
	height: 135px;
	border-radius: 10px;
	display: flex;
	padding: 18px 20px 15px 20px;
	position: relative;
`;

export const CommentArea = styled.textarea`
	font-size: 14px;
	overflow-y: auto;
	width: 100%;
	height: 64%;
	resize: none;
	border: none;
	box-sizing: border-box;
	font-family: "Firago";
	outline: none;
`;

export const CommentButton = styled.button`
	background-color: #8338ec;
	border-radius: 20px;
	padding: 8px 18px;
	color: #ffffff;
	font-family: "Firago";
	font-weight: 300;
	font-size: 16px;
	border: none;
	transition: 0.3s all ease-in-out;
	cursor: pointer;
	margin-top: auto;
	position: absolute;
	right: 20px;
	bottom: 20px;

	&:hover {
		background-color: #b588f4;
	}
`;

export const AllComments = styled.div``;

export const OneComment = styled.div`
	color: #343a40;
`;

export const AuthorName = styled.span`
	color: #212529;
	margin-bottom: 8px;
	font-family: "Firago";
	font-weight: 500;
	font-size: 18px;
`;

export const CommenterAvatar = styled.img`
	width: 38px;
	height: 38px;
	border-radius: 50%;
	margin-right: 12px;
`;

export const CommentText = styled.p`
	margin-top: 8px;
	margin-bottom: 10px;
`;

export const CancelSubComment = styled.button`
	border: none;
	background: none;
	position: absolute;
	color: #8338ec;
	font-family: "Firago";
	font-weight: 200;
	bottom: 20px;
`;

export const ReplyButton = styled.button`
	background: none;
	border: none;
	color: #8338ec;
	font-family: "Firago";
	font-weight: 200;
	cursor: pointer;
	padding: 0;
	font-size: 12px;
`;
