import { fetchFromTMDB } from "../services/tmdb.service.js"; // Import TMDB service utility

// Controller to get a random trending TV show
export async function getTrendingTv(req, res) {
	try {
		// Fetch trending TV shows for the day
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]; // Pick a random show

		// Respond with the random show
		res.json({ success: true, content: randomMovie });
	} catch (error) {
		console.log("Error in getTrendingTv controller:", error.message); // Log the error
		res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with a 500 error
	}
}

// Controller to get trailers for a specific TV show
export async function getTvTrailers(req, res) {
	const { id } = req.params; // Extract TV show ID from route parameters
	try {
		// Fetch trailers for the specified TV show
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
		res.json({ success: true, trailers: data.results }); // Respond with the trailer data
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null); // Handle 404 errors specifically
		}

		console.log("Error in getTvTrailers controller:", error.message); // Log the error
		res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with a 500 error
	}
}

// Controller to get details of a specific TV show
export async function getTvDetails(req, res) {
	const { id } = req.params; // Extract TV show ID from route parameters
	try {
		// Fetch TV show details
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
		res.status(200).json({ success: true, content: data }); // Respond with the TV show details
	} catch (error) {
		if (error.message.includes("404")) {
			return res.status(404).send(null); // Handle 404 errors specifically
		}

		console.log("Error in getTvDetails controller:", error.message); // Log the error
		res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with a 500 error
	}
}

// Controller to get similar TV shows to a specific TV show
export async function getSimilarTvs(req, res) {
	const { id } = req.params; // Extract TV show ID from route parameters
	try {
		// Fetch similar TV shows
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
		res.status(200).json({ success: true, similar: data.results }); // Respond with the list of similar shows
	} catch (error) {
		console.log("Error in getSimilarTvs controller:", error.message); // Log the error
		res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with a 500 error
	}
}

// Controller to get TV shows by category (e.g., "popular", "top_rated")
export async function getTvsByCategory(req, res) {
	const { category } = req.params; // Extract category from route parameters
	try {
		// Fetch TV shows for the specified category
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
		res.status(200).json({ success: true, content: data.results }); // Respond with the TV show data
	} catch (error) {
		console.log("Error in getTvsByCategory controller:", error.message); // Log the error
		res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with a 500 error
	}
}
