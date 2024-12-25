import { Navigate, Route, Routes } from "react-router-dom";  // Importing necessary routing components
import HomePage from "./pages/home/HomePage";  // Importing the HomePage component
import LoginPage from "./pages/LoginPage";  // Importing the LoginPage component
import SignUpPage from "./pages/SignUpPage";  // Importing the SignUpPage component
import WatchPage from "./pages/WatchPage";  // Importing the WatchPage component
import Footer from "./components/Footer";  // Importing the Footer component
import { Toaster } from "react-hot-toast";  // Importing the Toaster for displaying toast notifications
import { useAuthStore } from "./store/authUser";  // Importing the custom auth store to manage user state
import { useEffect } from "react";  // Importing the useEffect hook to manage side effects
import { Loader } from "lucide-react";  // Importing the Loader component for loading indicator
import SearchPage from "./pages/SearchPage";  // Importing the SearchPage component
import SearchHistoryPage from "./pages/SearchHistoryPage";  // Importing the SearchHistoryPage component
import NotFoundPage from "./pages/404";  // Importing the NotFoundPage component for handling 404 errors

function App() {
	// Destructuring values from the auth store: user info, loading state, and auth check function
	const { user, isCheckingAuth, authCheck } = useAuthStore();

	// Running the authCheck function once on component mount to check if the user is authenticated
	useEffect(() => {
		authCheck();
	}, [authCheck]);

	// While the authentication status is being checked, display a loading spinner
	if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-red-600 size-10' />  {/* Show loading spinner */}
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Routing logic */}
			<Routes>
				{/* Route for the HomePage */}
				<Route path='/' element={<HomePage />} />
				
				{/* Route for the LoginPage, only accessible if the user is not logged in */}
				<Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				
				{/* Route for the SignUpPage, only accessible if the user is not logged in */}
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
				
				{/* Route for the WatchPage, accessible only if the user is logged in */}
				<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to={"/login"} />} />
				
				{/* Route for the SearchPage, accessible only if the user is logged in */}
				<Route path='/search' element={user ? <SearchPage /> : <Navigate to={"/login"} />} />
				
				{/* Route for the SearchHistoryPage, accessible only if the user is logged in */}
				<Route path='/history' element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />} />
				
				{/* Catch-all route for undefined paths, displaying the NotFoundPage */}
				<Route path='/*' element={<NotFoundPage />} />
			</Routes>
			
			{/* Footer component */}
			<Footer />

			{/* Toast notifications for success/error messages */}
			<Toaster />
		</>
	);
}

export default App;
