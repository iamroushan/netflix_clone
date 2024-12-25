import { useState } from "react"; // Importing React's useState hook for managing state
import { useContentStore } from "../store/content"; // Importing custom content store to manage global content state
import Navbar from "../components/Navbar"; // Importing Navbar component
import { Search } from "lucide-react"; // Importing Search icon from lucide-react
import toast from "react-hot-toast"; // Importing toast for showing notifications
import axios from "axios"; // Importing axios for making HTTP requests
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants"; // Importing the base URL for images
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation

const SearchPage = () => {
  // State variables for managing active tab, search term, and search results
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const { setContentType } = useContentStore(); // Destructure the function to set content type from the content store

  // Function to handle tab click and set the appropriate content type (movie, tv, or person)
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]); // Clear previous results when switching tabs
  };

  // Function to handle search submission
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`); // Fetch search results from the API
      setResults(res.data.content); // Set search results in the state
    } catch (error) {
      if (error.response.status === 404) {
        toast.error("Nothing found, make sure you are searching under the right category"); // Show error if no results found
      } else {
        toast.error("An error occurred, please try again later"); // Show generic error if something else fails
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar /> {/* Navbar component */}
      
      <div className="container mx-auto px-4 py-8">
        {/* Tab buttons to toggle between Movies, TV Shows, and Person */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${activeTab === "movie" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "tv" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === "person" ? "bg-red-600" : "bg-gray-800"} hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        {/* Search form */}
        <form className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
            placeholder={"Search for a " + activeTab} // Placeholder text changes based on activeTab
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" /> {/* Search icon */}
          </button>
        </form>

        {/* Display search results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            // Skip rendering results that don't have poster or profile image
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {/* If searching for person, show their profile picture */}
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  // If searching for movie or TV show, show the poster
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => setContentType(activeTab)} // Set the content type when the link is clicked
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name} // Use title for movies, name for TV shows
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.title || result.name}</h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
