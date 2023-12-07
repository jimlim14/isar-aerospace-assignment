import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button: React.FC<Props> = (props) => {
	return <CustomButton {...props}>{props.children}</CustomButton>;
};

const CustomButton = styled.button``;

export default Button;
