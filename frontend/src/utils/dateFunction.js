// Function to format a release date into a readable string format (e.g., "January 1, 2024")
export function formatReleaseDate(date) {
	// Convert the input date to a JavaScript Date object and format it
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",  // Include the year (e.g., "2024")
		month: "long",    // Include the full month name (e.g., "January")
		day: "numeric",   // Include the day as a number (e.g., "1")
	});
}
