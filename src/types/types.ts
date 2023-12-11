export type SpectrumStatus = {
	velocity: number;
	altitude: number;
	temperature: number;
	statusMessage: string;
	isAscending: boolean;
	isActionRequired: boolean;
	date: string;
};

export type SpectrumWS = {
	Velocity: number;
	Altitude: number;
	Temperature: number;
	StatusMessage: string;
	IsAscending: boolean;
	IsActionRequired: boolean;
	date: string;
};

export type ActionHistory = {
	id: number;
	action: string;
};
