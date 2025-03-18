import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FilterArrow } from "../../pages/home/filter/styles";

const DropdownContainer = styled.div`
	position: relative;
	width: 100%;
	opacity: ${({ disabled }) => (disabled ? 0 : 1)};
`;

const DropdownHeader = styled.div`
	padding: 14px;
	background-color: #ffffff;
	outline: none;
	box-shadow: none;
	border: 1px solid #dee2e6;
	font-size: 14px;
	font-family: "Firago";
	font-weight: 200;
	border-radius: 5px;
	color: #0d0f10;
	cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
	pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: auto;
	box-sizing: border-box;
	&:focus {
		border-color: #4b4b4b;
	}
`;

const DropdownIcon = styled.div`
	margin-left: 10px;
	transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
	transition: transform 0.4s ease;
`;

const DropdownList = styled.div`
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	margin-top: 5px;
	padding: 0;
	background-color: #ffffff;
	border: 1px solid #8338ec;
	border-radius: 5px;
	max-height: 200px;
	overflow-y: auto;
	z-index: 100;
	display: ${({ isOpen }) => (isOpen ? "block" : "none")};

	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;
	scrollbar-width: none;
`;

const DropdownItem = styled.div`
	padding: 14px;
	cursor: pointer;
	font-size: 14px;
	font-family: "Firago";
	font-weight: 200;
	color: #0d0f10;
	display: flex;
	align-items: center;

	&:hover {
		background-color: #f8f9fa;
	}
`;

const ContentWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
`;

const Placeholder = styled.span`
	color: ${({ selected }) => (selected ? "#0d0f10" : "#6c757d")};
`;

const DropDown = ({
	options = [],
	placeholder = "",
	onSelect,
	renderOption = null,
	renderSelected = null,
	value = null,
	disabled = false,
}) => {
	const displayPlaceholder = options.length > 0 ? options[0].name : placeholder;
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleSelect = (option) => {
		setSelectedOption(option);
		setIsOpen(false);
		if (onSelect) onSelect(option);
	};

	return (
		<DropdownContainer ref={dropdownRef} disabled={disabled}>
			<DropdownHeader onClick={toggleDropdown} disabled={disabled}>
				<ContentWrapper centered={!!selectedOption} isOpen={isOpen}>
					{selectedOption ? (
						renderSelected ? (
							renderSelected(selectedOption)
						) : (
							selectedOption.name
						)
					) : (
						<Placeholder selected={false}>{displayPlaceholder}</Placeholder>
					)}
				</ContentWrapper>
				<DropdownIcon isOpen={isOpen}>
					<FilterArrow>
						<svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
							<path d="M1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L6.29289 7.70711C6.68342 8.09763 7.31658 8.09763 7.70711 7.70711L13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893Z" />
						</svg>
					</FilterArrow>
				</DropdownIcon>
			</DropdownHeader>

			<DropdownList isOpen={isOpen}>
				{options.map((option) => (
					<DropdownItem key={option.id} onClick={() => handleSelect(option)}>
						{renderOption ? renderOption(option) : option.name}
					</DropdownItem>
				))}
			</DropdownList>
		</DropdownContainer>
	);
};

export default DropDown;
