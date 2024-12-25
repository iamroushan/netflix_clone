import { User } from "../models/user.model.js"; // Import User model for database interaction
import { fetchFromTMDB } from "../services/tmdb.service.js"; // TMDB service utility

// Controller to search for a person using TMDB API
export async function searchPerson(req, res) {
	const { query } = req.params; // Extract query from route parameters
	try {
		// Fetch search results for a person from TMDB
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// Handle case where no results are found
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// Update user's search history with the first result
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].profile_path,
					title: response.results[0].name,
					searchType: "person",
					createdAt: new Date(),
				},
			},
		});

		// Respond with search results
		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchPerson controller: ", error.message); // Log errors for debugging
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to search for a movie using TMDB API
export async function searchMovie(req, res) {
	const { query } = req.params; // Extract query from route parameters

	try {
		// Fetch search results for a movie from TMDB
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// Handle case where no results are found
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// Update user's search history with the first result
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].title,
					searchType: "movie",
					createdAt: new Date(),
				},
			},
		});
		res.status(200).json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchMovie controller: ", error.message); // Log errors for debugging
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to search for a TV show using TMDB API
export async function searchTv(req, res) {
	const { query } = req.params; // Extract query from route parameters

	try {
		// Fetch search results for a TV show from TMDB
		const response = await fetchFromTMDB(
			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
		);

		// Handle case where no results are found
		if (response.results.length === 0) {
			return res.status(404).send(null);
		}

		// Update user's search history with the first result
		await User.findByIdAndUpdate(req.user._id, {
			$push: {
				searchHistory: {
					id: response.results[0].id,
					image: response.results[0].poster_path,
					title: response.results[0].name,
					searchType: "tv",
					createdAt: new Date(),
				},
			},
		});
		res.json({ success: true, content: response.results });
	} catch (error) {
		console.log("Error in searchTv controller: ", error.message); // Log errors for debugging
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to retrieve user's search history
export async function getSearchHistory(req, res) {
	try {
		// Respond with user's search history
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

// Controller to remove an item from user's search history
export async function removeItemFromSearchHistory(req, res) {
	let { id } = req.params; // Extract item ID from route parameters

	id = parseInt(id); // Convert ID to an integer

	try {
		// Remove the item with the specified ID from the user's search history
		await User.findByIdAndUpdate(req.user._id, {
			$pull: {
				searchHistory: { id: id },
			},
		});

		// Respond with success message
		res.status(200).json({ success: true, message: "Item removed from search history" });
	} catch (error) {
		console.log("Error in removeItemFromSearchHistory controller: ", error.message); // Log errors for debugging
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}
