import React, { useEffect, useState } from "react";
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
	Validation,
	ValidationsWrapper,
} from "./styles";
import apiService from "../../services/api";
import DropDown from "../../components/common/dropdown/DropDown";

const CreateTask = () => {
	const [departments, setDepartments] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState("");
	const [employees, setEmployees] = useState([]);
	const [priority, setPriority] = useState([]);
	const [status, setStatus] = useState([]);

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const response = await apiService.getDepartments();
				console.log(response);
				setDepartments(response.data);
			} catch (error) {
				console.log("couldn't fetch departments", error);
			}
		};

		fetchDepartments();
	}, []);

	const handleDepartmentChange = (selectedOption) => {
		setSelectedDepartment(selectedOption.id);
		console.log(selectedOption.id);
	};

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
							<ValidationsWrapper>
								<Validation>მინიმუმ 2 სიმბოლო</Validation>
								<Validation>მაქსიმუმ 255 სიმბოლო</Validation>
							</ValidationsWrapper>
						</InputWrapper>
						<InputWrapper>
							<InputLabel>აღწერა</InputLabel>
							<TextArea></TextArea>
							<ValidationsWrapper>
								<Validation>მინიმუმ 2 სიმბოლო</Validation>
								<Validation>მაქსიმუმ 255 სიმბოლო</Validation>
							</ValidationsWrapper>
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
							<DropDown
								options={departments}
								onSelect={handleDepartmentChange}
							/>
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
