import { Link } from "react-router-dom"; // Importing the Link component for navigation

const NotFoundPage = () => {
  return (
    <div
      // Container div with full-screen background image and centered content
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404.png')` }} // 404 image as the background
    >
      {/* Header with Netflix logo */}
      <header className="absolute top-0 left-0 p-4 bg-black w-full ">
        <Link to={"/"}> {/* Link to redirect to home page */}
          <img src="/netflix-logo.png" alt="Netflix" className="h-8" /> {/* Netflix logo */}
        </Link>
      </header>
      
      {/* Main content with error message */}
      <main className="text-center error-page--content z-10">
        <h1 className="text-7xl font-semibold mb-4">Lost your way?</h1> {/* Main heading */}
        <p className="mb-6 text-xl">
          Sorry, we can't find that page. You'll find lots to explore on the home page.
        </p> {/* Error message */}
        
        {/* Button to redirect back to the homepage */}
        <Link to={"/"} className="bg-white text-black py-2 px-4 rounded">
          Netflix Home
        </Link>
      </main>
    </div>
  );
};

export default NotFoundPage;
