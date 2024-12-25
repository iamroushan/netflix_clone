import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

// Creating a store using Zustand to manage authentication state
export const useAuthStore = create((set) => ({
  user: null, // Stores the current user data (if logged in)
  isSigningUp: false, // Tracks if the user is currently signing up
  isCheckingAuth: true, // Tracks if authentication check is in progress
  isLoggingOut: false, // Tracks if the user is logging out
  isLoggingIn: false, // Tracks if the user is logging in

  // Signup function to create a new user account
  signup: async (credentials) => {
    set({ isSigningUp: true }); // Sets the signing up state to true
    try {
      // Sends a POST request to the backend API to create a new user
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false }); // Sets the user state and updates signing up state
      toast.success("Account created successfully"); // Shows a success message
    } catch (error) {
      // In case of an error, shows an error message and resets the user state
      toast.error(error.response.data.message || "Signup failed");
      set({ isSigningUp: false, user: null });
    }
  },

  // Login function to authenticate an existing user
  login: async (credentials) => {
    set({ isLoggingIn: true }); // Sets the logging in state to true
    try {
      // Sends a POST request to the backend API to log the user in
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false }); // Sets the user state and updates logging in state
    } catch (error) {
      // In case of an error, shows an error message and resets the user state
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  // Logout function to log out the current user
  logout: async () => {
    set({ isLoggingOut: true }); // Sets the logging out state to true
    try {
      // Sends a POST request to the backend API to log the user out
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false }); // Resets the user state and updates logging out state
      toast.success("Logged out successfully"); // Shows a success message
    } catch (error) {
      // In case of an error, shows an error message
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  // Auth check function to verify if the user is authenticated
  authCheck: async () => {
    set({ isCheckingAuth: true }); // Sets the checking auth state to true
    try {
      // Sends a GET request to the backend API to check if the user is authenticated
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false }); // Sets the user state and updates checking auth state
    } catch (error) {
      // If there's an error, it doesn't set the user and just finishes checking auth
      set({ isCheckingAuth: false, user: null });
      // toast.error(error.response.data.message || "An error occurred"); // Optional error message
    }
  },
}));
