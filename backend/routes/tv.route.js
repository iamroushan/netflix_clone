import express from "express"; // Importing express to create a new router for TV-related routes
import {
	getSimilarTvs, // Function to get similar TV shows
	getTrendingTv, // Function to get trending TV shows
	getTvDetails, // Function to get details of a specific TV show
	getTvsByCategory, // Function to get TV shows by a specific category
	getTvTrailers, // Function to get trailers for a specific TV show
} from "../controllers/tv.controller.js"; // Importing TV controller functions

const router = express.Router(); // Creating a new router instance

// Route to get trending TV shows, handles GET requests to /trending
router.get("/trending", getTrendingTv);

// Route to get trailers of a specific TV show, handles GET requests to /:id/trailers
router.get("/:id/trailers", getTvTrailers);

// Route to get details of a specific TV show, handles GET requests to /:id/details
router.get("/:id/details", getTvDetails);

// Route to get similar TV shows to a specific TV show, handles GET requests to /:id/similar
router.get("/:id/similar", getSimilarTvs);

// Route to get TV shows by category, handles GET requests to /:category
router.get("/:category", getTvsByCategory);

export default router; // Exporting the router to be used in the main app file
