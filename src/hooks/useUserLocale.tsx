import { useState, useEffect } from "react";

// detect user's location
function useUserLocale() {
	const [userLocale, setUserLocale] = useState("en-US");

	useEffect(() => {
		const detectUserLocale = () => {
			const detectedLocale = navigator.language || "en-US";
			setUserLocale(detectedLocale);
		};

		detectUserLocale();
	}, []);
	return userLocale;
}

export default useUserLocale;
