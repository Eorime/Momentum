import React from "react";
import Header from "../../components/common/header/Header";
import {
	Container,
	CreateFormContainer,
	CreateTaskContainer,
	CreateTaskTitle,
	DateInput,
	DateInputWrapper,
	FiltersContainer,
	FormASide,
	FormBSide,
	Input,
	InputLabel,
	InputWrapper,
	TextArea,
} from "./styles";

const CreateTask = () => {
	return (
		<Container>
			<Header />
			<CreateTaskContainer>
				<CreateTaskTitle>შექმენი ახალი დავალება</CreateTaskTitle>
				<CreateFormContainer>
					<FormASide>
						<InputWrapper>
							<InputLabel>სათაური*</InputLabel>
							<Input />
						</InputWrapper>
						<InputWrapper>
							<InputLabel>აღწერა</InputLabel>
							<TextArea></TextArea>
						</InputWrapper>
						<FiltersContainer>
							<InputWrapper>
								<InputLabel>პრიორიტეტი*</InputLabel>
								<Input />
							</InputWrapper>
							<InputWrapper>
								<InputLabel>სტატუსი*</InputLabel>
								<Input />
							</InputWrapper>
						</FiltersContainer>
					</FormASide>
					<FormBSide>
						<InputWrapper>
							<InputLabel>დეპარტამენტი*</InputLabel>
							<Input />
						</InputWrapper>
						<InputWrapper>
							<InputLabel>პასუხისმგებელი თანამშრომელი*</InputLabel>
							<Input />
						</InputWrapper>
						<DateInputWrapper>
							<InputLabel>დედლაინი</InputLabel>
							<DateInput />
						</DateInputWrapper>
					</FormBSide>
				</CreateFormContainer>
			</CreateTaskContainer>
		</Container>
	);
};

export default CreateTask;
