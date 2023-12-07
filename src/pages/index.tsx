import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [spectrumStatus, setSpectrumStatus] = useState<>(null);
  const [actionRequired, setActionRequired] = useState(false);

	useEffect(() => {
		fetch("/api/SpectrumStatus")
			.then((res) => res.json())
			.then((data) => setSpectrumStatus(data))
			.catch((e) => console.log(e));
	}, []);

  // useEffect(() => {
	// 	webSocketService.connect(
	// 		"wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS",
	// 		(data) => {
	// 			setSpectrumStatus(data);
	// 		},
	// 		() => {
	// 			setActionRequired(true);
	// 		}
	// 	);

	// 	// Clean up the WebSocket connection when the component unmounts
	// 	return () => {
	// 		webSocketService.close();
	// 	};
	// }, [])

	return <>{spectrumStatus && spectrumStatus.statusMessage}</>;
}
