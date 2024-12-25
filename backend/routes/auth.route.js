import express from "express"; // Importing express to create a router for authentication routes
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js"; // Importing authentication controller functions
import { protectRoute } from "../middleware/protectRoute.js"; // Importing middleware to protect certain routes

const router = express.Router(); // Creating a new router instance

// Route for user signup, handles POST requests to /signup
router.post("/signup", signup);

// Route for user login, handles POST requests to /login
router.post("/login", login);

// Route for user logout, handles POST requests to /logout
router.post("/logout", logout);

// Route for checking authentication status, protected by the protectRoute middleware
router.get("/authCheck", protectRoute, authCheck);

// Exporting the router to be used in the main app file
export default router;
