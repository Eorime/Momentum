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
	SubmitButton,
	TextArea,
	Validation,
	ValidationsWrapper,
} from "./styles";
import apiService from "../../services/api";
import DropDown from "../../components/common/dropdown/DropDown";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		description: "",
		due_date: "",
		department: null,
		employee: null,
		priority: null,
		status: null,
	});

	const [validations, setValidations] = useState({
		nameMinLength: false,
		nameMaxLength: true,
		descMinLength: false,
		descMaxLength: true,
	});

	useEffect(() => {
		setValidations({
			nameMinLength:
				formData.name.trim().length === 0
					? null
					: formData.name.trim().length >= 2,
			nameMaxLength:
				formData.name.trim().length === 0
					? null
					: formData.name.trim().length <= 255,
			descMinLength:
				!formData.description || formData.description.trim().length === 0
					? null
					: formData.description.trim().length >= 2,
			descMaxLength:
				!formData.description || formData.description.trim().length === 0
					? null
					: formData.description.trim().length <= 255,
		});
	}, [formData.name, formData.description]);

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

	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const checkFormValidity = () => {
			const isValid =
				formData.name &&
				formData.name.trim().length >= 2 &&
				formData.priority &&
				formData.status &&
				formData.department &&
				(formData.department ? formData.employee : true);

			setIsFormValid(isValid);
		};

		checkFormValidity();
	}, [formData]);

	const [filteredEmployees, setFilteredEmployees] = useState([]);

	const handleDropdownChange = (field) => (selectedOption) => {
		setSelected((prev) => ({
			...prev,
			[field]: selectedOption,
		}));

		setFormData((prev) => ({
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

			setFormData((prev) => ({ ...prev, employee: null }));
		}
		console.log(`selected ${field}:`, selectedOption.id);
	};

	const handleDateChange = (e) => {
		const { value } = e.target;
		setFormData((prev) => ({
			...prev,
			due_date: value,
		}));
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

	//handle submit button
	const handleSubmit = async () => {
		if (!isFormValid) {
			return;
		}
		try {
			//format the task data
			const taskData = {
				name: formData.name,
				description: formData.description,
				due_date: formData.due_date,
				status: formData.status,
				priority: formData.priority,
				department: formData.department,
				employee: formData.employee,
			};

			const response = await apiService.createTask(taskData);
			console.log("task created", response.data);
			navigate("/");
		} catch (error) {
			console.error("error creating task:", error);
		}
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
							<Input
								name="name"
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({ ...prev, name: e.target.value }))
								}
							/>
							<ValidationsWrapper>
								<Validation
									status={
										validations.nameMinLength === null
											? "default"
											: validations.nameMinLength
											? "valid"
											: "invalid"
									}
								>
									მინიმუმ 2 სიმბოლო
								</Validation>
								<Validation
									status={
										validations.nameMaxLength === null
											? "default"
											: validations.nameMaxLength
											? "valid"
											: "invalid"
									}
								>
									მაქსიმუმ 255 სიმბოლო
								</Validation>
							</ValidationsWrapper>
						</InputWrapper>
						<InputWrapper>
							<InputLabel>აღწერა</InputLabel>
							<TextArea
								name="description"
								value={formData.description}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										description: e.target.value,
									}))
								}
							></TextArea>
							<ValidationsWrapper>
								<Validation
									status={
										validations.descMinLength === null
											? "default"
											: validations.descMinLength
											? "valid"
											: "invalid"
									}
								>
									მინიმუმ 2 სიმბოლო
								</Validation>
								<Validation
									status={
										validations.descMaxLength === null
											? "default"
											: validations.descMaxLength
											? "valid"
											: "invalid"
									}
								>
									მაქსიმუმ 255 სიმბოლო
								</Validation>
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
							<InputLabel disabled={!selected.department}>
								პასუხისმგებელი თანამშრომელი*
							</InputLabel>
							<DropDown
								options={filteredEmployees}
								onSelect={handleDropdownChange("employee")}
								renderOption={renderEmployee}
								renderSelected={renderEmployee}
								placeholder={!selected.department ? "აირჩიეთ დეპარტამენტი" : ""}
								disabled={!selected.department}
								value={selected.employee}
							/>
						</InputWrapper>
						<DateInputWrapper>
							<InputLabel>დედლაინი</InputLabel>
							<DateInput
								type="date"
								name="due_date"
								value={formData.due_date}
								onChange={handleDateChange}
							/>
						</DateInputWrapper>
					</FormBSide>
					<SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
						დავალების შექმნა
					</SubmitButton>
				</CreateFormContainer>
			</CreateTaskContainer>
		</Container>
	);
};

export default CreateTask;
