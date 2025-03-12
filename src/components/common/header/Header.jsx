import React from "react";
import {
	Container,
	HeaderButtonWrapper,
	Logo,
	NewEmployeeButton,
	NewTaskButton,
	Span,
} from "./styles";
import logo from "../../../assets/icons/logo.svg";

const Header = () => {
	return (
		<Container>
			<Logo src={logo} />
			<HeaderButtonWrapper>
				<NewEmployeeButton>თანამშრომლის შექმნა</NewEmployeeButton>
				<NewTaskButton>
					<svg
						width="12"
						height="12"
						viewBox="0 0 12 12"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1 6H11"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M6 11V1"
							stroke="white"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<Span>შექმენი ახალი დავალება</Span>
				</NewTaskButton>
			</HeaderButtonWrapper>
		</Container>
	);
};

export default Header;
