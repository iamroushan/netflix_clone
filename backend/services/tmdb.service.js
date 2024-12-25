import axios from "axios"; // Importing axios for making HTTP requests
import { ENV_VARS } from "../config/envVars.js"; // Importing environment variables containing the TMDB API key

// Function to fetch data from TMDB API
export const fetchFromTMDB = async (url) => {
	// Set up the headers for the request, including authorization with the API key
	const options = {
		headers: {
			accept: "application/json", // Request JSON response
			Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY, // Adding the API key for authorization
		},
	};

	// Making the GET request to the TMDB API
	const response = await axios.get(url, options);

	// If the response status is not 200, throw an error
	if (response.status !== 200) {
		throw new Error("Failed to fetch data from TMDB" + response.statusText);
	}

	// Return the data from the response
	return response.data;
};
