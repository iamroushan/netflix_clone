import dotenv from "dotenv"; // Import dotenv library to load environment variables from a .env file

// Load environment variables from the .env file into process.env
dotenv.config();

// Export the environment variables as a single object for easy access throughout the application
export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI, // MongoDB connection string
    PORT: process.env.PORT || 5000, // Server port, defaults to 5000 if not specified
    JWT_SECRET: process.env.JWT_SECRET, // Secret key for signing JWT tokens
    NODE_ENV: process.env.NODE_ENV, // Environment type (e.g., "development", "production")
    TMDB_API_KEY: process.env.TMDB_API_KEY, // API key for accessing The Movie Database (TMDb) API
};
