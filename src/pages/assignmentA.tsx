import { useEffect, useState } from "react";
import { SpectrumStatus } from "@app/types/types";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useDetectUserLocale from "@app/hooks/useUserLocale";
import getTimeFormat from "@app/utils/getTimeFormat";
import Button from "@app/components/Button";
import styled from "styled-components";

Chart.register(...registerables);

export default function Home() {
	const userLocale = useDetectUserLocale();
	const [spectrumStatus, setSpectrumStatus] = useState<SpectrumStatus[]>([]);
	const [errorMessage, setErrorMessage] = useState<{ error: string } | null>(
		null
	);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchSpectrumStatus();
			if (data.error) {
				setErrorMessage(data);
			} else {
				setSpectrumStatus(() => [
					{
						...data,
						date: getTimeFormat(userLocale),
					},
				]);
				setErrorMessage(null);
			}
		};

		fetchData();
	}, []);

	const fetchSpectrumStatus = async () => {
		try {
			const res = await fetch("/api/SpectrumStatus");
			const data = await res.json();
			return data;
		} catch (e: any) {
			console.error(e);
			return { error: `client error: ${e.message}` };
		}
	};

	const handleNewDataRequest = async () => {
		const data = await fetchSpectrumStatus();
		if (data.error) {
			setErrorMessage(data);
		} else {
			setSpectrumStatus((prev) => [
				...prev,
				{
					...data,
					date: getTimeFormat(userLocale),
				},
			]);
			setErrorMessage(null);
		}
	};

	const getSpectrumData = (key: string) => {
		return spectrumStatus.map((data) => data[key as keyof SpectrumStatus]);
	};

	const dates = getSpectrumData("date");
	const velocities = getSpectrumData("velocity");
	const altitude = getSpectrumData("altitude");
	const temperatures = getSpectrumData("temperature");

	return (
		<div style={{ padding: "40px" }}>
			<h1>Assignment A</h1>
			<FlexContainer>
				<FlexItem>
					<Line
						datasetIdKey="velocity"
						data={{
							labels: [...dates],
							datasets: [
								{
									label: "Velocity",
									data: [...velocities],
									borderColor: "rgba(75,192,192,1)",
								},
							],
						}}
					/>
				</FlexItem>
				<FlexItem>
					<Line
						datasetIdKey="altitude"
						data={{
							labels: [...dates],
							datasets: [
								{
									label: "Altitude",
									data: [...altitude],
									borderColor: "#5000ff",
								},
							],
						}}
					/>
				</FlexItem>
				<FlexItem>
					<Line
						datasetIdKey="temperature"
						data={{
							labels: [...dates],
							datasets: [
								{
									label: "Temperature",
									data: [...temperatures],
									borderColor: "#00000",
								},
							],
						}}
					/>
				</FlexItem>
				{spectrumStatus.length !== 0 && (
					<div style={{ padding: "20px" }}>
						<h3>Other information</h3>
						<P>
							latest status message:{" "}
							{spectrumStatus[spectrumStatus.length - 1].statusMessage}
						</P>
						<P>
							Ascending or Descending:{" "}
							{spectrumStatus[spectrumStatus.length - 1].isAscending
								? "Ascending"
								: "Descending"}
						</P>
						<P>
							Action required:{" "}
							{spectrumStatus[spectrumStatus.length - 1].isActionRequired
								? "yes"
								: "no"}
						</P>
						<Button onClick={handleNewDataRequest}>add new data</Button>
						{errorMessage && (
							<P style={{ color: "red" }}>
								{errorMessage.error}, please try again later.
							</P>
						)}
					</div>
				)}
			</FlexContainer>
		</div>
	);
}

export const FlexContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const FlexItem = styled.div`
	position: relative;
	height: 50vh;
	min-width: 45vw;
	max-width: 45vw;
`;

export const P = styled.p`
	margin: 10px 0;
`;
