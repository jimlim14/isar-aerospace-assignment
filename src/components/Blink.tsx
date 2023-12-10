import React, { useState, useEffect, HTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
	shouldBlink: boolean;
	delay: number;
	children: React.ReactNode;
}

const Blink: React.FC<Props> = ({ shouldBlink, children, delay, ...props }) => {
	const [blink, setBlink] = useState(false);

	useEffect(() => {
		if (shouldBlink) {
			const intervalId = setInterval(() => {
				setBlink((prevBlink) => !prevBlink);
			}, delay);

			return () => {
				clearInterval(intervalId);
			};
		} else {
			setBlink(false); // Reset blink state if shouldBlink is false
		}
	}, [shouldBlink, delay]);

	return (
		<BlinkContainer $shouldBlink={shouldBlink} $blink={blink} {...props}>
			{children}
		</BlinkContainer>
	);
};

export default Blink;

export const BlinkContainer = styled.div<{
	$shouldBlink: boolean;
	$blink: boolean;
}>`
	color: ${(props) => props.$shouldBlink && (props.$blink ? "red" : "white")};
	background-color: ${(props) =>
		props.$shouldBlink && (props.$blink ? "white" : "red")};
`;
