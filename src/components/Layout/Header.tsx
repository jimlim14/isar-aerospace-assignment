import Image from "next/image";
import React from "react";
import styles from "./Header.module.css";
import { isarLogo } from "@public/images";
import styled from "styled-components";

function Header() {
	return (
		<Container>
			<Image src={isarLogo} width={222} height={42} alt="" />
		</Container>
	);
}

export const Container = styled.div`
	padding: 40px;
	border-bottom: 1px solid grey;
`;

export default Header;
