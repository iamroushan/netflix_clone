import { fetchFromTMDB } from "../services/tmdb.service.js"; // Import the TMDB service utility

// Controller to fetch a random trending movie
export async function getTrendingMovie(req, res) {
	try {
		// Fetch trending movies from TMDB API
		const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
		
		// Select a random movie from the results
		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
		
		// Respond with the selected movie
		res.json({ success: true, content: randomMovie });
	} catch (error) {
		// Handle errors and respond with 500 status
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to fetch trailers of a specific movie
export async function getMovieTrailers(req, res) {
	const { id } = req.params; // Extract the movie ID from route parameters
	try {
		// Fetch trailers for the given movie ID
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
		
		// Respond with the list of trailers
		res.json({ success: true, trailers: data.results });
	} catch (error) {
		// Handle 404 error specifically for missing movie
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		// Handle other errors and respond with 500 status
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to fetch details of a specific movie
export async function getMovieDetails(req, res) {
	const { id } = req.params; // Extract the movie ID from route parameters
	try {
		// Fetch details for the given movie ID
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
		
		// Respond with the movie details
		res.status(200).json({ success: true, content: data });
	} catch (error) {
		// Handle 404 error specifically for missing movie
		if (error.message.includes("404")) {
			return res.status(404).send(null);
		}

		// Handle other errors and respond with 500 status
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to fetch similar movies to a given movie
export async function getSimilarMovies(req, res) {
	const { id } = req.params; // Extract the movie ID from route parameters
	try {
		// Fetch similar movies for the given movie ID
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
		
		// Respond with the list of similar movies
		res.status(200).json({ success: true, similar: data.results });
	} catch (error) {
		// Handle errors and respond with 500 status
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to fetch movies by category
export async function getMoviesByCategory(req, res) {
	const { category } = req.params; // Extract the category from route parameters
	try {
		// Fetch movies for the given category
		const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
		
		// Respond with the list of movies in the category
		res.status(200).json({ success: true, content: data.results });
	} catch (error) {
		// Handle errors and respond with 500 status
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
