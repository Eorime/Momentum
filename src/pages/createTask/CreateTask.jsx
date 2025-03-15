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

	const saveFormToStorage = () => {
		localStorage.setItem("taskFormData", JSON.stringify(formData));
	};

	const [validations, setValidations] = useState({
		nameMinLength: null,
		nameMaxLength: null,
		descMinWords: null,
		descMaxLength: null,
	});

	useEffect(() => {
		const countWords = (text) => {
			if (!text || text.trim() === "") return 0;
			return text
				.trim()
				.split(/\s+/)
				.filter((word) => word.length > 0).length;
		};

		const descriptionWordCount = countWords(formData.description);

		setValidations({
			nameMinLength:
				formData.name.trim().length === 0
					? null
					: formData.name.trim().length >= 3,
			nameMaxLength:
				formData.name.trim().length === 0
					? null
					: formData.name.trim().length <= 255,
			descMinWords:
				!formData.description || formData.description.trim() === ""
					? null
					: descriptionWordCount >= 4,
			descMaxLength:
				!formData.description || formData.description.trim() === ""
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
			const countWords = (text) => {
				if (!text || text.trim() === "") return 0;
				return text
					.trim()
					.split(/\s+/)
					.filter((word) => word.length > 0).length;
			};

			const descriptionWordCount = countWords(formData.description);

			const isValid =
				formData.name &&
				formData.name.trim().length >= 3 &&
				formData.priority &&
				formData.status &&
				formData.department &&
				formData.due_date &&
				(formData.department ? formData.employee : true) &&
				(!formData.description ||
					formData.description.trim() === "" ||
					descriptionWordCount >= 4);

			setIsFormValid(isValid);
		};

		checkFormValidity();
	}, [formData]);

	const [filteredEmployees, setFilteredEmployees] = useState([]);

	const loadFormFromStorage = () => {
		const savedData = localStorage.getItem("taskFormData");
		if (savedData) {
			const parsedData = JSON.parse(savedData);
			setFormData(parsedData);

			//restore selected values for dropdowns
			if (parsedData.department) {
				setSelected((prev) => ({ ...prev, department: parsedData.department }));
			}

			if (parsedData.employee) {
				setSelected((prev) => ({ ...prev, employee: parsedData.employee }));
			}

			if (parsedData.priority) {
				setSelected((prev) => ({ ...prev, priority: parsedData.priority }));
			}

			if (parsedData.status) {
				setSelected((prev) => ({ ...prev, status: parsedData.status }));
			}
		}
	};

	useEffect(() => {
		loadFormFromStorage();
	}, []);

	const handleDropdownChange = (field) => (selectedOption) => {
		setSelected((prev) => ({
			...prev,
			[field]: selectedOption,
		}));

		setFormData((prev) => {
			const newData = {
				...prev,
				[field]: selectedOption,
			};
			localStorage.setItem("taskFormData", JSON.stringify(newData));
			return newData;
		});

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

			setFormData((prev) => {
				const newData = { ...prev, employee: null };
				localStorage.setItem("taskFormData", JSON.stringify(newData));
				return newData;
			});
		}
		console.log(`selected ${field}:`, selectedOption.id);
	};

	const handleDateChange = (e) => {
		const { value } = e.target;
		setFormData((prev) => {
			const newData = {
				...prev,
				due_date: value,
			};
			localStorage.setItem("taskFormData", JSON.stringify(newData));
			return newData;
		});
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
				status_id: formData.status,
				priority_id: formData.priority,
				department_id: formData.department,
				employee_id: formData.employee,
			};

			console.log("sending task data:", taskData);

			const response = await apiService.createTask(taskData);
			console.log("task created", response.data);
			localStorage.removeItem("taskFormData");
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
								onChange={(e) => {
									const newFormData = { ...formData, name: e.target.value };
									setFormData(newFormData);
									localStorage.setItem(
										"taskFormData",
										JSON.stringify(newFormData)
									);
								}}
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
									მინიმუმ 3 სიმბოლო
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
								onChange={(e) => {
									const newFormData = {
										...formData,
										description: e.target.value,
									};
									setFormData(newFormData);
									localStorage.setItem(
										"taskFormData",
										JSON.stringify(newFormData)
									);
								}}
							></TextArea>
							<ValidationsWrapper>
								<Validation
									status={
										validations.descMinWords === null
											? "default"
											: validations.descMinWords
											? "valid"
											: "invalid"
									}
								>
									მინიმუმ 4 სიტყვა
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
							<InputLabel>დედლაინი* </InputLabel>
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
