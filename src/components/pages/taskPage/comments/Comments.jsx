import React, { useEffect, useState } from "react";
import {
	AllComments,
	AuthorName,
	CancelSubComment,
	CommentArea,
	CommentAreaWrapper,
	CommentButton,
	CommenterAvatar,
	CommentText,
	Container,
	ReplyButton,
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

	return (
		<Container>
			<CommentAreaWrapper>
				{replyToId && (
					<CancelSubComment
						onClick={cancelReply}
						style={{ marginLeft: "10px", cursor: "pointer" }}
					>
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
			<AllComments>
				{comments.map((comment) => (
					<div key={comment.id} style={{ marginBottom: "20px" }}>
						{/* parent */}
						<div
							style={{
								display: "flex",
								alignItems: "flex-start",
								marginBottom: "10px",
							}}
						>
							<CommenterAvatar
								src={comment.author_avatar}
								alt={comment.author_nickname}
							/>
							<div>
								<AuthorName>{comment.author_nickname}</AuthorName>
								<CommentText>{comment.text}</CommentText>
								<ReplyButton onClick={() => handleReply(comment.id)}>
									უპასუხე
								</ReplyButton>
							</div>
						</div>
						{comment.sub_comments && comment.sub_comments.length > 0 && (
							<div style={{ marginLeft: "50px" }}>
								{comment.sub_comments.map((subComment) => (
									<div
										key={subComment.id}
										style={{
											display: "flex",
											alignItems: "flex-start",
											marginBottom: "10px",
										}}
									>
										<CommenterAvatar
											src={subComment.author_avatar}
											alt={subComment.author_nickname}
										/>
										<div>
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
