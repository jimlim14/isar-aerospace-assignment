import WebSocketComponent from "@app/components/WebSocketComponent";
import { ActionHistory, SpectrumWS } from "@app/types/types";
import { useState, useEffect } from "react";
import useDetectUserLocale from "@app/hooks/useUserLocale";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import getTimeFormat from "@app/utils/getTimeFormat";
import Button from "@app/components/Button";

Chart.register(...registerables);

const actions = ["eject immediately", "whatsap", "hello"];

function AssignmentB() {
	const userLocale = useDetectUserLocale();
	const [liveSpectrumData, setLiveSpectrumData] = useState<SpectrumWS[]>([]);
	const [connected, setConnected] = useState(false);
	const [isActionRequired, setIsActionRequired] = useState(false);
	const [hasRegisteredAction, setHasRegisteredAction] = useState(false);
	const [actionHistory, setActionHistory] = useState<ActionHistory[]>([]);

	const handleDataUpdate = (data: SpectrumWS) => {
		setLiveSpectrumData((prev) => [
			...prev,
			{ ...data, date: getTimeFormat(userLocale) },
		]);

		// add requested action from Spectrum
		if (data.IsActionRequired !== isActionRequired) {
			setIsActionRequired(data.IsActionRequired);

			if (data.IsActionRequired && !hasRegisteredAction) {
				setActionHistory((prevHistory) => [
					...prevHistory,
					{ id: Date.now(), action: "random action" },
				]);
				setHasRegisteredAction(true);
			} else if (!data.IsActionRequired) {
				setHasRegisteredAction(false);
			}
		}
	};

	const handleActionRequired = (actionId: number) => {
		// Handle action required
		setActionHistory((prevActionHistory) =>
			prevActionHistory.filter((prevAction) => prevAction.id !== actionId)
		);
	};

	const getSpectrumData = (key: string) => {
		return liveSpectrumData.map((data) => data[key]);
	};

	const dates = getSpectrumData("date");
	const velocities = getSpectrumData("Velocity");
	const altitude = getSpectrumData("Altitude");
	const temperatures = getSpectrumData("Temperature");

	return (
		<div style={{ padding: "40px" }}>
			<h1>Assignment B</h1>
			<WebSocketComponent
				onData={handleDataUpdate}
				onOpen={() => setConnected(true)}
				onClose={() => setConnected(false)}
				// onActionRequired={handleActionRequired}
			/>
			<ConnectionText $connected={connected}>
				{connected ? "Connected" : "Connection lost, reconnecting..."}
			</ConnectionText>
			<FlexContainer>
				<FlexItem>
					<Line
						datasetIdKey="velocity"
						data={{
							labels: [...dates],
							datasets: [
								{
									label: "velocity",
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
									label: "altitude",
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
									label: "temperature",
									data: [...temperatures],
									borderColor: "#00000",
								},
							],
						}}
					/>
				</FlexItem>
				<FlexItem>
					{liveSpectrumData.length !== 0 && (
						<div style={{ padding: "20px" }}>
							<h3>Other information</h3>
							<P>
								latest status message:{" "}
								{liveSpectrumData[liveSpectrumData.length - 1].StatusMessage}
							</P>
							<P>
								Ascending or Descending:{" "}
								{liveSpectrumData[liveSpectrumData.length - 1].IsAscending
									? "Ascending"
									: "Descending"}
							</P>
							<P>
								Action required:{" "}
								<Span>
									{liveSpectrumData[liveSpectrumData.length - 1]
										.IsActionRequired
										? "yes"
										: "no"}
								</Span>
							</P>
							{actionHistory.length !== 0 && (
								<div>
									<h2>Actions required!</h2>
									{actionHistory.map((action, i) => (
										<div
											key={action.id}
											style={{
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<p>
												{i + 1}) action {action.id}
											</p>
											<Button onClick={() => handleActionRequired(action.id)}>
												Take action!
											</Button>
										</div>
									))}
								</div>
							)}
						</div>
					)}
				</FlexItem>
			</FlexContainer>
		</div>
	);
}

export default AssignmentB;

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

export const Span = styled.span`
	padding: 8px;
	background-color: red;
	color: white;
`;

export const ConnectionText = styled.h1<{ $connected: boolean }>`
	color: ${(props) => (props.$connected ? "green" : "red")};
	margin: 10px 0;
`;
