import React, { useState, useEffect } from "react";
import {
	AvatarIcon,
	AvatarIconWrapper,
	AvatarInput,
	AvatarInputWrapper,
	AvatarLabel,
	AvatarPreview,
	ButtonWrapper,
	Container,
	FormContainer,
	Input,
	InputLabel,
	InputWrapper,
	ModalContainer,
	ModalName,
	SubmitButton,
	SVGWrapper,
	TopSideWrapper,
	Validation,
	ValidationsWrapper,
} from "./styles";
import DropDown from "../dropdown/DropDown";
import apiService from "../../../services/api";
import gallery from "../../../assets/icons/gallery.svg";

const Modal = ({ onClose }) => {
	const [employeeFormData, setEmployeeFormData] = useState({
		name: "",
		surname: "",
		avatar: "",
		department: "",
	});
	const [departments, setDepartments] = useState([]);
	const [selectedDepartment, setSelectedDepartment] = useState(null);
	const [fileName, setFileName] = useState("");
	const [imagePreview, setImagePreview] = useState(null);

	const [validations, setValidations] = useState({
		nameMinLength: null,
		nameMaxLength: null,
		nameCharacters: null,
		surnameMinLength: null,
		surnameMaxLength: null,
		surnameCharacters: null,
	});

	const hasOnlyGeorgianAndEnglish = (text) => {
		const pattern = /^[\u10A0-\u10FF a-zA-Z]+$/;
		return pattern.test(text);
	};

	useEffect(() => {
		const { name, surname } = employeeFormData;

		setValidations({
			nameMinLength: name === "" ? null : name.length >= 2,
			nameMaxLength: name === "" ? null : name.length <= 255,
			nameCharacters: name === "" ? null : hasOnlyGeorgianAndEnglish(name),

			surnameMinLength: surname === "" ? null : surname.length >= 2,
			surnameMaxLength: surname === "" ? null : surname.length <= 255,
			surnameCharacters:
				surname === "" ? null : hasOnlyGeorgianAndEnglish(surname),
		});
	}, [employeeFormData]);

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const response = await apiService.getDepartments();
				setDepartments(response);
			} catch (error) {
				console.log("couldnt fetch", error);
			}
		};
		fetchDepartments();
	}, []);

	const handleDepartmentSelect = (department) => {
		setSelectedDepartment(department);
		setEmployeeFormData({
			...employeeFormData,
			department: department.id,
		});
		console.log(department.id);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEmployeeFormData({
			...employeeFormData,
			[name]: value,
		});
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];

		if (file) {
			//check format
			if (!file.type.match("image.*")) {
				setFileName("ატვირთე ფოტო");
				setImagePreview(null);
				return;
			}

			//check size
			if (file.size > 600 * 1024) {
				setFileName("ატვირთე ფოტო");
				setImagePreview(null);
				return;
			}

			//update the filename
			setFileName(file.name);

			//url for preview
			const previewUrl = URL.createObjectURL(file);
			setImagePreview(previewUrl);

			//store the file itself
			setEmployeeFormData({
				...employeeFormData,
				avatar: file,
			});
		}
	};

	const handleContainerClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleSvgClick = () => {
		onClose();
	};

	const handleSubmit = async () => {
		try {
			//form data object for file upload
			const formData = new FormData();
			formData.append("name", employeeFormData.name);
			formData.append("surname", employeeFormData.surname);
			formData.append("department_id", employeeFormData.department);

			// append file if it exists
			if (employeeFormData.avatar instanceof File) {
				formData.append("avatar", employeeFormData.avatar);
			}

			//send data
			const response = await apiService.createEmployee(formData);

			onClose();
		} catch (error) {
			console.error("error creating employee:", error);
		}
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
				<ModalName>თანამშრომლის დამატება</ModalName>
				<FormContainer>
					<TopSideWrapper>
						<InputWrapper>
							<InputLabel>სახელი*</InputLabel>
							<Input
								name="name"
								value={employeeFormData.name}
								onChange={handleInputChange}
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
								<Validation
									status={
										validations.nameCharacters === null
											? "default"
											: validations.nameCharacters
											? "valid"
											: "invalid"
									}
								>
									მარტო ლათინური და ქართული სიმბოლოები
								</Validation>
							</ValidationsWrapper>
						</InputWrapper>
						<InputWrapper>
							<InputLabel>გვარი*</InputLabel>
							<Input
								name="surname"
								value={employeeFormData.surname}
								onChange={handleInputChange}
							/>
							<ValidationsWrapper>
								<Validation
									status={
										validations.surnameMinLength === null
											? "default"
											: validations.surnameMinLength
											? "valid"
											: "invalid"
									}
								>
									მინიმუმ 2 სიმბოლო
								</Validation>
								<Validation
									status={
										validations.surnameMaxLength === null
											? "default"
											: validations.surnameMaxLength
											? "valid"
											: "invalid"
									}
								>
									მაქსიმუმ 255 სიმბოლო
								</Validation>
								<Validation
									status={
										validations.surnameCharacters === null
											? "default"
											: validations.surnameCharacters
											? "valid"
											: "invalid"
									}
								>
									მარტო ლათინური და ქართული სიმბოლოები
								</Validation>
							</ValidationsWrapper>
						</InputWrapper>
					</TopSideWrapper>
					<InputWrapper>
						<InputLabel>ავატარი*</InputLabel>
						<AvatarInputWrapper>
							<AvatarInput
								onClick={() => document.getElementById("avatarInput").click()}
							>
								<AvatarIconWrapper>
									{!imagePreview ? (
										<>
											<AvatarIcon src={gallery} />
											<AvatarLabel>ატვირთე ფოტო</AvatarLabel>
										</>
									) : (
										<AvatarPreview src={imagePreview} alt="Preview" />
									)}
								</AvatarIconWrapper>
							</AvatarInput>
							<input
								id="avatarInput"
								type="file"
								accept="image/*"
								onChange={handleFileChange}
								style={{ display: "none" }}
							/>
						</AvatarInputWrapper>
					</InputWrapper>
					<InputWrapper>
						<InputLabel>დეპარტამენტი*</InputLabel>
						<DropDown
							style="width: 384px; padding: 14px; background-color: #ffffff; outline: none; box-shadow: none; border: 1px solid #ced4da; font-size: 14px; font-family: 'Firago'; font-weight: 200; border-radius: 6px; color: #0d0f10;"
							options={departments.data}
							onSelect={handleDepartmentSelect}
							value={selectedDepartment}
						/>
					</InputWrapper>
					<ButtonWrapper>
						<SubmitButton onClick={handleSubmit}>
							დაამატე თანამშრომელი
						</SubmitButton>
					</ButtonWrapper>
				</FormContainer>
			</ModalContainer>
		</Container>
	);
};

export default Modal;
