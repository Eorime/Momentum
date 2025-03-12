import React from "react";
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

const Header = () => {
	return (
		<Container>
			<Link to={routes.home}>
				<Logo src={logo} />
			</Link>
			<HeaderButtonWrapper>
				<NewEmployeeButton>თანამშრომლის შექმნა</NewEmployeeButton>
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
		</Container>
	);
};

export default Header;
