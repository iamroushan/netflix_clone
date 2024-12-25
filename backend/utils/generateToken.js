import jwt from "jsonwebtoken"; // Importing the jwt package for creating JWT tokens
import { ENV_VARS } from "../config/envVars.js"; // Importing environment variables to access JWT secret and environment

// Function to generate JWT token and set it as an HTTP-only cookie
export const generateTokenAndSetCookie = (userId, res) => {
	// Generating a JWT token with userId as payload, signed using the JWT secret and setting an expiry time of 15 days
	const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "15d" });

	// Setting the token in the response cookies with various security settings
	res.cookie("jwt-netflix", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, // Setting the cookie to expire in 15 days (in milliseconds)
		httpOnly: true, // Preventing access to the cookie from JavaScript (helps protect against XSS attacks)
		sameSite: "strict", // Limiting cross-site request forgery (CSRF) attacks by only sending the cookie on same-site requests
		secure: ENV_VARS.NODE_ENV !== "development", // Only setting the cookie over HTTPS in production environment
	});

	// Returning the generated token (optional)
	return token;
};
