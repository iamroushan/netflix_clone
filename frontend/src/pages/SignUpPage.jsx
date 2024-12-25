import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser"; // Import custom store for authentication logic

const SignUpPage = () => {
	// Extract email parameter from the current URL
	const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	// State hooks for form fields: email, username, password
	const [email, setEmail] = useState(emailValue || ""); // Default email from URL if available
	const [username, setUsername] = useState(""); // Username state
	const [password, setPassword] = useState(""); // Password state

	// Authentication signup function and loading state from store
	const { signup, isSigningUp } = useAuthStore();

	// Handle form submission and call the signup function from the store
	const handleSignUp = (e) => {
		e.preventDefault(); // Prevent form default submission
		signup({ email, username, password }); // Trigger the signup function
	};

	return (
		<div className='h-screen w-full hero-bg'>
			<header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
				<Link to={"/"}> {/* Navigate to home page */}
					<img src='/netflix-logo.png' alt='logo' className='w-52' /> {/* Logo */}
				</Link>
			</header>

			{/* Centered form container */}
			<div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

					{/* Sign-up form */}
					<form className='space-y-4' onSubmit={handleSignUp}>
						{/* Email input field */}
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='you@example.com'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)} // Update email state
							/>
						</div>

						{/* Username input field */}
						<div>
							<label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
								Username
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='johndoe'
								id='username'
								value={username}
								onChange={(e) => setUsername(e.target.value)} // Update username state
							/>
						</div>

						{/* Password input field */}
						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='••••••••'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)} // Update password state
							/>
						</div>

						{/* Submit button */}
						<button
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700'
							disabled={isSigningUp} // Disable button when signing up
						>
							{isSigningUp ? "Loading..." : "Sign Up"} {/* Change button text during loading */}
						</button>
					</form>

					{/* Link to login page for existing users */}
					<div className='text-center text-gray-400'>
						Already a member?{" "}
						<Link to={"/login"} className='text-red-500 hover:underline'>
							Sign in
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
