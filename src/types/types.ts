export type SpectrumStatus = {
	velocity: number;
	altitude: number;
	temperature: number;
	statusMessage: string;
	isAscending: boolean;
	isActionRequired: boolean;
  date: Date;
};