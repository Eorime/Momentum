import styled from "styled-components";

export const Container = styled.div`
	width: 688px;
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
