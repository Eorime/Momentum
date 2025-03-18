import React, { useEffect, useState } from "react";
import {
	AllComments,
	AuthorName,
	CancelSubComment,
	CommentArea,
	CommentAreaWrapper,
	CommentButton,
	CommentCountLabel,
	CommentCountNumber,
	CommentCountWrapper,
	CommenterAvatar,
	CommentText,
	Container,
	OneComment,
	ReplyButton,
	ReplyButtonWrapper,
} from "./style";
import apiService from "../../../../services/api";
import { useParams } from "react-router-dom";

const Comments = () => {
	const { id: taskId } = useParams();
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [replyToId, setReplyToId] = useState(null);

	useEffect(() => {
		const fetchComments = async () => {
			try {
				const response = await apiService.getCommentsByTaskId(taskId);
				setComments(response.data || []);
				console.log(response);
			} catch (error) {
				console.log("couldnt fetch comments", error);
			}
		};

		fetchComments();
	}, [taskId]);

	const handleCommentChange = (e) => {
		setNewComment(e.target.value);
	};

	const handleSubmitComment = async () => {
		//checks if comment is empty
		if (!newComment.trim()) return;

		try {
			//passes the text as a parameter
			const response = await apiService.addComment(
				taskId,
				newComment.trim(),
				replyToId
			);

			//update list
			if (replyToId) {
				//if its a reply, find parent and add to sub
				const updatedComments = comments.map((comment) => {
					if (comment.id === replyToId) {
						return {
							...comment,
							sub_comments: [response.data, ...(comment.sub_comments || [])],
						};
					}
					return comment;
				});
				setComments(updatedComments);
			} else {
				//add new comment at the top
				setComments([{ ...response.data, sub_comments: [] }, ...comments]);
			}

			//clear the input and reset reply state
			setNewComment("");
			setReplyToId(null);
		} catch (error) {
			console.log("couldnt create comment", error);
		}
	};

	const handleReply = (commentId) => {
		setReplyToId(commentId);

		document.querySelector(".comment-input")?.focus();
	};

	const cancelReply = () => {
		setReplyToId(null);
	};

	//common styles for comment content
	const commentContentStyle = {
		flex: 1,
		minWidth: 0, //text overflow handling
	};

	return (
		<Container>
			<CommentAreaWrapper>
				{replyToId && (
					<CancelSubComment onClick={cancelReply}>
						პასუხის გაუქმება
					</CancelSubComment>
				)}
				<CommentArea
					className="comment-input"
					value={newComment}
					onChange={handleCommentChange}
					placeholder="დაწერე კომენტარი"
				/>
				<CommentButton
					onClick={handleSubmitComment}
					disabled={!newComment.trim()}
				>
					დააკომენტარე
				</CommentButton>
			</CommentAreaWrapper>
			<CommentCountWrapper>
				<CommentCountLabel>კომენტარები</CommentCountLabel>
				<CommentCountNumber>{comments.length}</CommentCountNumber>
			</CommentCountWrapper>
			<AllComments>
				{comments.map((comment) => (
					<div key={comment.id} style={{ marginBottom: "20px" }}>
						{/* parent */}
						<OneComment style={{ width: "100%" }}>
							<CommenterAvatar
								src={comment.author_avatar}
								alt={comment.author_nickname}
							/>
							<div style={commentContentStyle}>
								<AuthorName>{comment.author_nickname}</AuthorName>
								<CommentText>{comment.text}</CommentText>
								<ReplyButtonWrapper>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g clipPath="url(#clip0_4246_2027)">
											<path
												d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z"
												fill="#8338EC"
											/>
											<path
												d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z"
												fill="#8338EC"
											/>
										</g>
										<defs>
											<clipPath id="clip0_4246_2027">
												<rect width="16" height="16" fill="white" />
											</clipPath>
										</defs>
									</svg>
									<ReplyButton onClick={() => handleReply(comment.id)}>
										უპასუხე
									</ReplyButton>
								</ReplyButtonWrapper>
							</div>
						</OneComment>
						{comment.sub_comments && comment.sub_comments.length > 0 && (
							<div style={{ marginLeft: "50px" }}>
								{comment.sub_comments.map((subComment) => (
									<div
										key={subComment.id}
										style={{
											display: "flex",
											alignItems: "flex-start",
											marginBottom: "10px",
											width: "100%",
										}}
									>
										<CommenterAvatar
											src={subComment.author_avatar}
											alt={subComment.author_nickname}
										/>
										<div style={commentContentStyle}>
											<AuthorName>{subComment.author_nickname}</AuthorName>
											<CommentText>{subComment.text}</CommentText>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</AllComments>
		</Container>
	);
};

export default Comments;
