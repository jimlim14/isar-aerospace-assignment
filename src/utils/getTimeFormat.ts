export default function getTimeFormat(userLocale: string) {
	const currentDate = new Date();

	const formattedTime = new Intl.DateTimeFormat(userLocale, {
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
	}).format(currentDate);
  
  return formattedTime;
}
