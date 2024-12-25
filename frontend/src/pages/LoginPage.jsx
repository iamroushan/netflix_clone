import { useState } from "react"; // Importing useState hook for managing local state
import { Link } from "react-router-dom"; // Importing Link for navigation
import { useAuthStore } from "../store/authUser"; // Importing the custom hook to manage authentication state

const LoginPage = () => {
  // State to store email and password values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Destructuring the login function and isLoggingIn state from the auth store
  const { login, isLoggingIn } = useAuthStore();

  // Handle login form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    login({ email, password }); // Call login function from auth store with email and password
  };

  return (
    <div className="h-screen w-full hero-bg">
      {/* Header with Netflix logo and link to homepage */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      {/* Centered login form */}
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">Login</h1>

          {/* Login form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email input */}
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
              />
            </div>

            {/* Password input */}
            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-300 block">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
              />
            </div>

            {/* Login button */}
            <button
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              disabled={isLoggingIn} // Disable button while login is in progress
            >
              {isLoggingIn ? "Loading..." : "Login"} {/* Show loading or login text */}
            </button>
          </form>

          {/* Signup link for users without an account */}
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-red-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
