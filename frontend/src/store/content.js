import { create } from "zustand";

// Creating a store using Zustand to manage content-related state
export const useContentStore = create((set) => ({
  contentType: "movie", // Default content type is set to "movie"
  
  // Function to update the content type (e.g., "movie" or "tv-show")
  setContentType: (type) => set({ contentType: type }), // Sets the contentType state to the given type
}));
