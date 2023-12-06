import type { NextApiRequest, NextApiResponse } from "next";

const spectrumStatusAPI = process.env.SPECTRUM_STATUS_API;

type SpectrumStatus = {
	velocity: number;
	altitude: number;
	temperature: number;
	statusMessage: string;
	isAscending: boolean;
	isActionRequired: boolean;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SpectrumStatus | { error: string }>
) {
	try {
		if (!spectrumStatusAPI) {
			throw new Error("SPECTRUM_STATUS_API environment variable is not set.");
		}
		const response = await fetch(spectrumStatusAPI);
		const data = await response.json();

		res.status(response.status).json(data);
	} catch (error) {
		console.error("Error fetching sensor data:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
