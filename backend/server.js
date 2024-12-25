import express from "express"; // Importing express for creating the server
import cookieParser from "cookie-parser"; // Middleware for parsing cookies
import path from "path"; // Module for handling file and directory paths

import authRoutes from "./routes/auth.route.js"; // Importing authentication-related routes
import movieRoutes from "./routes/movie.route.js"; // Importing movie-related routes
import tvRoutes from "./routes/tv.route.js"; // Importing TV-related routes
import searchRoutes from "./routes/search.route.js"; // Importing search-related routes

import { ENV_VARS } from "./config/envVars.js"; // Importing environment variables
import { connectDB } from "./config/db.js"; // Importing database connection function
import { protectRoute } from "./middleware/protectRoute.js"; // Importing middleware to protect routes

const app = express(); // Creating an instance of the express application

const PORT = ENV_VARS.PORT; // Getting the port from environment variables
const __dirname = path.resolve(); // Resolving the current directory path

app.use(express.json()); // Middleware to parse JSON bodies of incoming requests
app.use(cookieParser()); // Middleware to parse cookies from incoming requests

// Setting up the API routes
app.use("/api/v1/auth", authRoutes); // Routes for authentication
app.use("/api/v1/movie", protectRoute, movieRoutes); // Routes for movie-related actions, protected by `protectRoute` middleware
app.use("/api/v1/tv", protectRoute, tvRoutes); // Routes for TV-related actions, protected by `protectRoute` middleware
app.use("/api/v1/search", protectRoute, searchRoutes); // Routes for search actions, protected by `protectRoute` middleware

// Handling production environment to serve static files
if (ENV_VARS.NODE_ENV === "production") {
	// Serve static files from the frontend build directory
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	// If any route is accessed, serve the `index.html` of the frontend
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Starting the server on the specified port and connecting to the database
app.listen(PORT, () => {
	console.log("Server started at http://localhost:" + PORT); // Log the server startup message
	connectDB(); // Connect to the database
});
