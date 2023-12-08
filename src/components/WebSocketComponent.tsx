import { SpectrumWS} from "@app/types/types";
import { useState, useEffect } from "react";

type Props = {
	onData: (data: SpectrumWS) => void;
	onOpen: () => void;
	onClose: () => void;
	onActionRequired: () => void;
};

function WebSocketComponent({
	onData,
	onOpen,
	onClose,
	onActionRequired,
}: Props) {
	const spectrumWSApi = process.env.NEXT_PUBLIC_SPECTRUM_WS_API;
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		if (!spectrumWSApi) {
			throw new Error("SPECTRUM_WS_API environment variable is not set.");
		}
		const ws = new WebSocket(spectrumWSApi);

		ws.onopen = (event) => {
			onOpen();
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			onData(data); // Update UI with live data

			if (data.isActionRequired) {
				onActionRequired(); // Handle action required scenario
			}
		};

		ws.onclose = () => {
      onClose();
			setTimeout(() => {
				setSocket(new WebSocket(spectrumWSApi));
			}, 1000); // Reconnect after 1 second
		};

		setSocket(ws);

		return () => {
			ws.close(); // Close WebSocket on component unmount
		};
	}, [onData, onOpen, onClose, onActionRequired, spectrumWSApi]);

	return null;
}

export default WebSocketComponent;
