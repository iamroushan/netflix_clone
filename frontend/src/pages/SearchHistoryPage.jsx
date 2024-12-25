import axios from "axios"; // Importing axios for making HTTP requests
import { useEffect, useState } from "react"; // Importing hooks from React
import Navbar from "../components/Navbar"; // Importing Navbar component
import { SMALL_IMG_BASE_URL } from "../utils/constants"; // Importing base URL for images
import { Trash } from "lucide-react"; // Importing Trash icon from lucide-react
import toast from "react-hot-toast"; // Importing toast for notifications

// Function to format date in "Month Day, Year" format
function formatDate(dateString) {
  const date = new Date(dateString); // Create a Date object from the input date string
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract the month, day, and year from the Date object
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`; // Return the formatted date string
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]); // State to store search history

  // Fetch search history data when the component mounts
  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`); // Fetch search history from the API
        setSearchHistory(res.data.content); // Set the fetched data to state
      } catch (error) {
        setSearchHistory([]); // If there's an error, set search history to an empty array
      }
    };
    getSearchHistory(); // Call the function to fetch search history
  }, []); // Empty dependency array to run only once when the component mounts

  // Handle delete action for a specific search entry
  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`); // Send delete request to API
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id)); // Update the state to remove the deleted entry
    } catch (error) {
      toast.error("Failed to delete search item"); // Show an error toast if delete fails
    }
  };

  // If there is no search history, display a message
  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  // Render the search history page
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar /> {/* Display Navbar component */}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        {/* Grid layout to display search history items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchHistory?.map((entry) => (
            <div key={entry.id} className="bg-gray-800 p-4 rounded flex items-start">
              {/* Display search entry image */}
              <img
                src={SMALL_IMG_BASE_URL + entry.image}
                alt="History image"
                className="size-16 rounded-full object-cover mr-4"
              />
              <div className="flex flex-col">
                {/* Display title and formatted date */}
                <span className="text-white text-lg">{entry.title}</span>
                <span className="text-gray-400 text-sm">{formatDate(entry.createdAt)}</span>
              </div>

              {/* Display search type (movie, tv, etc.) with different background color */}
              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)} {/* Capitalize first letter */}
              </span>

              {/* Trash icon for deleting the entry */}
              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry)} // Delete entry on click
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
