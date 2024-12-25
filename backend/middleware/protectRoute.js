import jwt from "jsonwebtoken"; // Import JWT for token verification
import { User } from "../models/user.model.js"; // Import the User model to query the database
import { ENV_VARS } from "../config/envVars.js"; // Import environment variables

// Middleware to protect routes by verifying user authentication
export const protectRoute = async (req, res, next) => {
	try {
		// Retrieve the token from cookies
		const token = req.cookies["jwt-netflix"];

		// If no token is provided, respond with 401 Unauthorized
		if (!token) {
			return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
		}

		// Verify the token using the secret key
		const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

		// If token verification fails, respond with 401 Unauthorized
		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid Token" });
		}

		// Find the user by ID stored in the decoded token, excluding the password field
		const user = await User.findById(decoded.userId).select("-password");

		// If no user is found, respond with 404 Not Found
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		// Attach the user object to the request for use in subsequent middleware or routes
		req.user = user;

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		console.log("Error in protectRoute middleware: ", error.message); // Log the error for debugging
		res.status(500).json({ success: false, message: "Internal Server Error" }); // Respond with 500 Internal Server Error
	}
};
