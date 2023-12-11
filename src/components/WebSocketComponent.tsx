import { SpectrumWS } from "@app/types/types";
import { useState, useEffect, useRef } from "react";

type Props = {
	onData: (data: SpectrumWS) => void;
	onOpen: () => void;
	onClose: () => void;
};

function WebSocketComponent({
	onData,
	onOpen,
	onClose,
}: Props) {
	const spectrumWSApi = process.env.NEXT_PUBLIC_SPECTRUM_WS_API;
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const clientRef = useRef<WebSocket | null>(null);
	const [waitingToReconnect, setWaitingToReconnect] = useState<boolean | null>(
		null
	);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (waitingToReconnect) {
			return;
		}

		if (!spectrumWSApi) {
			throw new Error("SPECTRUM_WS_API environment variable is not set.");
		}

		// Only set up the websocket once
		if (!clientRef.current) {
			const client = new WebSocket(spectrumWSApi);
			clientRef.current = client;

			client.onerror = (e) => console.error(e);

			client.onopen = () => {
				onOpen();
			};

			client.onclose = () => {
				if (clientRef.current) {
					// Connection failed
					console.log("ws closed by server");
				} else {
					// Cleanup initiated from app side, can return here, to not attempt a reconnect
					console.log("ws closed by app component unmount");
					return;
				}

				if (waitingToReconnect) {
					return;
				}

				// Parse event code and log
				onClose();
				console.log("ws closed");

				// Setting this will trigger a re-run of the effect,
				// cleaning up the current websocket, but not setting
				// up a new one right away
				setWaitingToReconnect(true);

				// This will trigger another re-run, and because it is false,
				// the socket will be set up again
				setTimeout(() => setWaitingToReconnect(null), 5000);
			};

			client.onmessage = (message) => {
        const data = JSON.parse(message.data)
				onData(data);
			};

			return () => {
				// Dereference, so it will set up next time
				clientRef.current = null;

				client.close();
			};
		}
	}, [onClose, onData, onOpen, spectrumWSApi, waitingToReconnect]);

	return null;
}

export default WebSocketComponent;
