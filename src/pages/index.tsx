import { useEffect, useState } from "react";
import { SpectrumStatus } from "@app/types/types";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import useDetectUserLocale from "@app/hooks/useUserLocale";
import getTimeFormat from "@app/utils/getTimeFormat";

Chart.register(...registerables);

export default function Home() {
	const userLocale = useDetectUserLocale();
	const [spectrumStatus, setSpectrumStatus] = useState<SpectrumStatus[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const spectrumData = await fetchSpectrumStatus();
			setSpectrumStatus(() => [
				{
					...spectrumData,
					date: getTimeFormat(userLocale),
				},
			]);
		};

		fetchData();
	}, []);

	const fetchSpectrumStatus = async () => {
		try {
			const res = await fetch("/api/SpectrumStatus");
			const data = await res.json();
			return data;
		} catch (e) {
			console.log(e);
		}
	};

	const handleNewDataRequest = async () => {
		const data = await fetchSpectrumStatus();
		setSpectrumStatus((prev) => [
			...prev,
			{
				...data,
				date: getTimeFormat(userLocale),
			},
		]);
	};

	const getSpectrumData = (key: string) => {
		return spectrumStatus.map((data) => data[key]);
	};

	const dates = getSpectrumData("date");
	const velocities = getSpectrumData("velocity");
	const altitude = getSpectrumData("altitude");
	const temperatures = getSpectrumData("temperature");

	return (
		<>
			<h1>Line chart</h1>
			<div style={{ display: "flex" }}>
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
			</div>
			{spectrumStatus.length !== 0 && (
				<>
					<div>
						<p>
							latest status message:{" "}
							{spectrumStatus[spectrumStatus.length - 1].statusMessage}
						</p>
					</div>
					<div>
						<p>
							Ascending or Descending:{" "}
							{spectrumStatus[spectrumStatus.length - 1].isAscending
								? "Ascending"
								: "Descending"}
						</p>
					</div>
					<div>
						<p>
							Action required:{" "}
							{spectrumStatus[spectrumStatus.length - 1].isActionRequired
								? "yes"
								: "no"}
						</p>
					</div>
				</>
			)}
			<button onClick={handleNewDataRequest}>add new data</button>
		</>
	);
}
