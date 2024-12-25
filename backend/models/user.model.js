import mongoose from "mongoose"; // Importing mongoose for database schema creation

// Defining the schema for the User model
const userSchema = mongoose.Schema({
	// Username field: Must be unique and is required
	username: {
		type: String,
		required: true,
		unique: true,
	},
	// Email field: Must be unique and is required
	email: {
		type: String,
		required: true,
		unique: true,
	},
	// Password field: Required for user authentication
	password: {
		type: String,
		required: true,
	},
	// Profile image field: Optional with a default value of an empty string
	image: {
		type: String,
		default: "",
	},
	// Search history field: Stores an array of user's search actions
	searchHistory: {
		type: Array, // Data type is an array
		default: [], // Default is an empty array
	},
});

// Exporting the User model to use it in other parts of the application
export const User = mongoose.model("User", userSchema);
