import mongoose from "mongoose"; // Import mongoose library to interact with MongoDB
import { ENV_VARS } from "./envVars.js"; // Import environment variables (e.g., database connection URI)

// Function to connect to MongoDB
export const connectDB = async () => {
    try {
        // Attempt to establish a connection to MongoDB using the provided connection string
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI);

        // Log a success message if the connection is established
        console.log("MongoDB connected: " + conn.connection.host);
    } catch (error) {
        // Log an error message if the connection fails
        console.error("Error connecting to MongoDB: " + error.message);

        // Exit the process with a failure code (1 indicates an error)
        process.exit(1);
    }
};
