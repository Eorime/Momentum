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
	color: #0d0f10;
	font-family: "Firago";
	font-weight: 400;
	margin: 0;
	transition: color 0.3s ease-in-out;
`;

export const FilterArrow = styled.svg`
	width: 14px;
	height: 8px;
	preserveaspectratio: xMidYMid meet;

	& path {
		fill: #0d0f10;
		transition: fill 0.3s ease-in-out;
	}
`;

export const FilterItem = styled.div`
	display: flex;
	gap: 13px;
	align-items: center;
	cursor: pointer;

	&:hover ${FilterLabel} {
		color: #8338ec;
	}

	&:hover ${FilterArrow} path {
		fill: #8338ec;
	}
`;

export const FilterOptions = styled.div`
	margin-top: 11px;
	background-color: #ffffff;
	height: auto;
	max-height: 300px;
	padding: 40px 30px 20px 30px;
	border-radius: 10px;
	border: 0.5px solid #8338ec;
`;

export const FilterOptionWrapper = styled.div``;

export const FilterOptionCheck = styled.div``;

export const FilterOptionLabel = styled.p`
	margin: 0;
	padding: 0;
	color: #212529;
	font-size: 16px;
`;
