import React, { useEffect, useState } from "react";
import Header from "../../components/common/header/Header";
import {
	Avatar,
	Container,
	CreateFormContainer,
	CreateTaskContainer,
	CreateTaskTitle,
	DateInput,
	DateInputWrapper,
	FiltersContainer,
	FormASide,
	FormBSide,
	Icon,
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
	const [dropdownData, setDropdownData] = useState({
		departments: [],
		employees: [],
		priorities: [],
		statuses: [],
	});

	const [selected, setSelected] = useState({
		department: "",
		employee: "",
		priority: "",
		status: "",
	});

	const [filteredEmployees, setFilteredEmployees] = useState([]);

	const handleDropdownChange = (field) => (selectedOption) => {
		setSelected((prev) => ({
			...prev,
			[field]: selectedOption,
		}));

		if (field === "department") {
			const departmentEmployees = dropdownData.employees.filter(
				(employee) => employee.department.id === selectedOption.id
			);
			setFilteredEmployees(departmentEmployees);

			//reset employee selection when department changes
			setSelected((prev) => ({
				...prev,
				employee: "",
			}));
		}
		console.log(`selected ${field}:`, selectedOption.id);
	};

	useEffect(() => {
		//fetch all needed data at once
		const fetchAllData = async () => {
			try {
				const apiCalls = {
					departments: apiService.getDepartments(),
					employees: apiService.getEmployees(),
					priorities: apiService.getPriorities(),
					statuses: apiService.getStatuses(),
				};

				//execute all api calls
				const results = await Promise.all(Object.values(apiCalls));

				//update states
				const keys = Object.keys(apiCalls);
				const newData = {};

				keys.forEach((key, index) => {
					newData[key] = results[index].data;
				});

				setDropdownData(newData);
			} catch (error) {
				console.log("error fetching dropdown data:", error);
			}
		};

		fetchAllData();
	}, []);

	const renderEmployee = (employee) => (
		<>
			{employee.avatar && (
				<Avatar src={employee.avatar} alt={`${employee.name}' image`} />
			)}
			{employee.name} {employee.surname}
		</>
	);

	const renderPriority = (priority) => (
		<>
			{priority.icon && <Icon src={priority.icon} />}
			{priority.name}
		</>
	);

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
								<DropDown
									options={dropdownData.priorities}
									renderOption={renderPriority}
									renderSelected={renderPriority}
									onSelect={handleDropdownChange("priority")}
								/>{" "}
							</InputWrapper>
							<InputWrapper>
								<InputLabel>სტატუსი*</InputLabel>
								<DropDown
									options={dropdownData.statuses}
									onSelect={handleDropdownChange("status")}
								/>
							</InputWrapper>
						</FiltersContainer>
					</FormASide>
					<FormBSide>
						<InputWrapper>
							<InputLabel>დეპარტამენტი*</InputLabel>
							<DropDown
								options={dropdownData.departments}
								onSelect={handleDropdownChange("department")}
							/>
						</InputWrapper>
						<InputWrapper>
							<InputLabel>პასუხისმგებელი თანამშრომელი*</InputLabel>
							<DropDown
								options={filteredEmployees}
								onSelect={handleDropdownChange("employee")}
								renderOption={renderEmployee}
								renderSelected={renderEmployee}
								placeholder={!selected.department ? "აირჩიეთ დეპარტამენტი" : ""}
								disabled={!selected.department}
							/>
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
