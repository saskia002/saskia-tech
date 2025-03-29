export function fixDateFormat(date: Date): string {
	return new Date(date)
		.toLocaleString("en-uk", {
			weekday: "long",
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
			timeZone: "EET",
		})
		.replaceAll("/", ".");
}
