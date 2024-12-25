import express from "express"; // Importing express to create a new router for movie-related routes
import {
	getMovieDetails, // Function to get details of a movie
	getMoviesByCategory, // Function to get movies by category
	getMovieTrailers, // Function to get trailers of a movie
	getSimilarMovies, // Function to get similar movies
	getTrendingMovie, // Function to get trending movie
} from "../controllers/movie.controller.js"; // Importing movie controller functions

const router = express.Router(); // Creating a new router instance

// Route to get trending movies, handles GET requests to /trending
router.get("/trending", getTrendingMovie);

// Route to get movie trailers, handles GET requests to /:id/trailers (using movie ID)
router.get("/:id/trailers", getMovieTrailers);

// Route to get movie details, handles GET requests to /:id/details (using movie ID)
router.get("/:id/details", getMovieDetails);

// Route to get similar movies, handles GET requests to /:id/similar (using movie ID)
router.get("/:id/similar", getSimilarMovies);

// Route to get movies by category, handles GET requests to /:category (using category name)
router.get("/:category", getMoviesByCategory);

export default router; // Exporting the router to be used in the main app file
