import { User } from "../models/user.model.js"; // Import the User model
import bcryptjs from "bcryptjs"; // Import bcrypt.js for hashing passwords
import { generateTokenAndSetCookie } from "../utils/generateToken.js"; // Import the utility for generating JWT tokens and setting cookies

// Signup controller
export async function signup(req, res) {
	try {
		const { email, password, username } = req.body; // Extract email, password, and username from request body

		// Validate required fields
		if (!email || !password || !username) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ success: false, message: "Invalid email" });
		}

		// Ensure password meets length requirement
		if (password.length < 6) {
			return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
		}

		// Check if email already exists in the database
		const existingUserByEmail = await User.findOne({ email });
		if (existingUserByEmail) {
			return res.status(400).json({ success: false, message: "Email already exists" });
		}

		// Check if username already exists in the database
		const existingUserByUsername = await User.findOne({ username });
		if (existingUserByUsername) {
			return res.status(400).json({ success: false, message: "Username already exists" });
		}

		// Hash the password with bcrypt
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// Assign a random profile picture
		const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
		const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

		// Create a new user instance
		const newUser = new User({
			email,
			password: hashedPassword,
			username,
			image,
		});

		// Generate a JWT token and set it as a cookie
		generateTokenAndSetCookie(newUser._id, res);

		// Save the new user to the database
		await newUser.save();

		// Respond with the newly created user (excluding the password)
		res.status(201).json({
			success: true,
			user: {
				...newUser._doc,
				password: "",
			},
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

// Login controller
export async function login(req, res) {
	try {
		const { email, password } = req.body;

		// Validate required fields
		if (!email || !password) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		// Check if the user exists in the database
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}

		// Compare the entered password with the hashed password in the database
		const isPasswordCorrect = await bcryptjs.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		// Generate a JWT token and set it as a cookie
		generateTokenAndSetCookie(user._id, res);

		// Respond with the user details (excluding the password)
		res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

// Logout controller
export async function logout(req, res) {
	try {
		// Clear the JWT cookie
		res.clearCookie("jwt-netflix");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

// Auth check controller
export async function authCheck(req, res) {
	try {
		// Respond with the authenticated user's details
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
