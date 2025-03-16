import styled from "styled-components";

export const Container = styled.div`
	position: relative;
	width: 688px;
`;

export const FilterContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: 95px;
	padding: 18px 12.5px;
	border: 1px solid #dee2e6;
	border-radius: 10px;
`;

export const FilterLabel = styled.p`
	color: ${(props) => (props.active === "true" ? "#8338EC" : "#0d0f10")};
	font-family: "Firago";
	font-weight: 400;
	margin: 0;
	display: flex;
	align-items: center;
	transition: color 0.3s ease-in-out;
`;

export const FilterArrow = styled.svg`
	width: 14px;
	height: 8px;
	preserveaspectratio: xMidYMid meet;

	& path {
		fill: ${(props) => (props.active === "true" ? "#8338EC" : "#0d0f10")}
		transition: fill 0.3s ease-in-out;
	}
`;

export const FilterItem = styled.div`
	display: flex;
	gap: 13px;
	align-items: center;
	cursor: pointer;
	color: ${(props) => (props.active === "true" ? "#8338EC" : "#0d0f10")};

	&:hover ${FilterLabel} {
		color: #8338ec;
	}

	&:hover ${FilterArrow} path {
		fill: #8338ec;
	}
`;

export const FilterOptions = styled.div`
	margin-top: 11px;
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	gap: 22px;
	background-color: #ffffff;
	height: auto;
	max-height: 300px;
	padding-left: 30px;
	padding-top: 40px;
	padding-bottom: 20px;
	border-radius: 10px;
	border: 0.5px solid #8338ec;

	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none;
	scrollbar-width: none;
`;

export const FilterOptionWrapper = styled.div`
	display: flex;
	gap: 15px;
`;

export const FilterOptionCheck = styled.input`
	width: 22px;
	border-radius: 6px;
	border: 1px solid #212529;
`;

export const FilterOptionLabel = styled.div`
	margin: 0;
	padding: 0;
	color: #212529;
	font-size: 16px;
	font-family: "Firago";
	font-weight: 400;
	display: flex;
	align-items: center;
`;

export const FilterAvatar = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 50%;
	margin-right: 10px;
	object-fit: cover;
`;
