import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 18px 20px 15px 20px;
`;

export const CommentAreaWrapper = styled.div`
	background-color: #ffffff;
	border: 1px solid #adb5bd;
	height: 135px;
	border-radius: 10px;
	display: flex;
	padding: 18px 20px 15px 20px;
	position: relative;
	margin-bottom: 60px;
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

export const CommentCountWrapper = styled.div`
	display: flex;
	margin-bottom: 40px;
	gap: 7px;
	align-items: center;
`;

export const CommentCountLabel = styled.span`
	font-size: 20px;
	font-family: "Firago";
	font-weight: 500;
	color: #000000;
`;

export const CommentCountNumber = styled.div`
	background-color: #8338ec;
	font-family: "Firago";
	font-size: 14px;
	font-weight: 500;
	color: #ffffff;
	padding: 3px 11px;
	border-radius: 30px;
`;

export const AllComments = styled.div``;

export const OneComment = styled.div`
	color: #343a40;
	width: 80px;
	display: flex;
	align-items: flex-start;
	margin-bottom: 10px;
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
	word-wrap: break-word;
	overflow-wrap: break-word;
	max-width: 100%;
	width: 100%;
`;

export const CancelSubComment = styled.button`
	border: none;
	background: none;
	position: absolute;
	color: #8338ec;
	font-family: "Firago";
	font-weight: 200;
	bottom: 20px;
	cursor: pointer;
	transition: 0.2s all ease-in-out;

	&:hover {
		color: #b588f4;
	}
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

	transition: 0.2s all ease-in-out;
`;

export const ReplyButtonWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 6px;

	&:hover {
		${ReplyButton} {
			color: #b588f4;
		}

		svg path {
			fill: #b588f4;
			transition: 0.2s all ease-in-out;
		}
	}

	svg path {
		transition: 0.2s all ease-in-out;
	}
`;
