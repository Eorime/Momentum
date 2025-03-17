import React, { useState } from "react";
import {
	Container,
	HeaderButtonWrapper,
	Logo,
	NewEmployeeButton,
	NewTaskButton,
	Span,
	SvgIcon,
} from "./styles";
import logo from "../../../assets/icons/logo.svg";
import { Link } from "react-router-dom";
import { routes } from "../../../constants/routes";
import Modal from "../modal/Modal";

const Header = () => {
	const [openModal, setOpenModal] = useState(false);

	const handleEmployeeButton = () => {
		setOpenModal(!openModal);
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	return (
		<Container>
			<Link to={routes.home}>
				<Logo src={logo} />
			</Link>
			<HeaderButtonWrapper>
				<NewEmployeeButton onClick={handleEmployeeButton}>
					თანამშრომლის შექმნა
				</NewEmployeeButton>
				<Link to={routes.createTask}>
					<NewTaskButton>
						<SvgIcon>
							<path d="M1 6H11" />
							<path d="M6 11V1" />
						</SvgIcon>
						<Span>შექმენი ახალი დავალება</Span>
					</NewTaskButton>
				</Link>
			</HeaderButtonWrapper>
			{openModal && <Modal onClose={closeModal} />}
		</Container>
	);
};

export default Header;
