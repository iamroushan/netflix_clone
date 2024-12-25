import express from "express"; // Importing express to create a new router for search-related routes
import {
	getSearchHistory, // Function to get the user's search history
	removeItemFromSearchHistory, // Function to remove an item from the search history
	searchMovie, // Function to search for movies
	searchPerson, // Function to search for persons
	searchTv, // Function to search for TV shows
} from "../controllers/search.controller.js"; // Importing search controller functions

const router = express.Router(); // Creating a new router instance

// Route to search for a person, handles GET requests to /person/:query
router.get("/person/:query", searchPerson);

// Route to search for a movie, handles GET requests to /movie/:query
router.get("/movie/:query", searchMovie);

// Route to search for a TV show, handles GET requests to /tv/:query
router.get("/tv/:query", searchTv);

// Route to get the search history, handles GET requests to /history
router.get("/history", getSearchHistory);

// Route to remove an item from search history, handles DELETE requests to /history/:id (using history ID)
router.delete("/history/:id", removeItemFromSearchHistory);

export default router; // Exporting the router to be used in the main app file
