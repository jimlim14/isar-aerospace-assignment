import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button: React.FC<Props> = (props) => {
	return <CustomButton {...props}>{props.children}</CustomButton>;
};

const CustomButton = styled.button`
	padding: 8px 12px;
	border-radius: 6px;
	border: 1px solid grey;
	background-color: white;
	cursor: pointer;
	transition: 0.22s;

	&:hover {
		transition: 0.22s;
		background-color: #f7f7f7;
	}
`;

export default Button;
