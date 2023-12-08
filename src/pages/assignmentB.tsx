import WebSocketComponent from "@app/components/WebSocketComponent";
import { SpectrumWS } from "@app/types/types";
import { useState, useEffect } from "react";

function Test() {
	const [liveSpectrumData, setLiveSpectrumData] = useState<SpectrumWS[]>([]);
	const [connected, setConnected] = useState(false);

	const handleDataUpdate = (data: SpectrumWS) => {
		setLiveSpectrumData((prev) => [...prev, { ...data, date: new Date() }]);
	};

	const handleActionRequired = () => {
		// Handle action required
	};

	return (
		<>
			<WebSocketComponent
				onData={handleDataUpdate}
				onOpen={() => setConnected(true)}
				onClose={() => setConnected(false)}
				onActionRequired={handleActionRequired}
			/>
			{connected ? <div>Connected!</div> : <>Connection lost, reconnecting now...</>}
			<div>
				{liveSpectrumData.length !== 0 &&
					liveSpectrumData[liveSpectrumData.length - 1]["Altitude"]}
			</div>
			test
		</>
	);
}

export default Test;
