import React, { useState } from "react";
import { Container, ModalContainer, SVGWrapper } from "./styles";

const Modal = ({ onClose }) => {
	const [employeeFormData, setemployeeFormData] = useState({
		name: "",
		surname: "",
		avatar: "",
		department: "",
	});

	const handleContainerClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};
	const handleSvgClick = () => {
		onClose();
	};

	return (
		<Container onClick={handleContainerClick}>
			<ModalContainer>
				<SVGWrapper onClick={handleSvgClick}>
					<svg
						width="40"
						height="40"
						viewBox="0 0 40 40"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM22.3567 20C22.3567 20 27.5883 25.2317 27.845 25.4883C28.4967 26.14 28.4967 27.195 27.845 27.845C27.1933 28.4967 26.1383 28.4967 25.4883 27.845C25.2317 27.59 20 22.3567 20 22.3567C20 22.3567 14.7683 27.5883 14.5117 27.845C13.86 28.4967 12.805 28.4967 12.155 27.845C11.5033 27.1933 11.5033 26.1383 12.155 25.4883C12.41 25.2317 17.6433 20 17.6433 20C17.6433 20 12.4117 14.7683 12.155 14.5117C11.5033 13.86 11.5033 12.805 12.155 12.155C12.8067 11.5033 13.8617 11.5033 14.5117 12.155C14.7683 12.41 20 17.6433 20 17.6433C20 17.6433 25.2317 12.4117 25.4883 12.155C26.14 11.5033 27.195 11.5033 27.845 12.155C28.4967 12.8067 28.4967 13.8617 27.845 14.5117C27.59 14.7683 22.3567 20 22.3567 20Z"
							fill="#DEE2E6"
						/>
					</svg>
				</SVGWrapper>
			</ModalContainer>
		</Container>
	);
};

export default Modal;
