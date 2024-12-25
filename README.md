<h1 align="center">MERN Netflix Clone 🎬</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)  <!-- Add a screenshot of your app to showcase the UI -->

## 🚀 Tech Stack
- ⚛️ **React.js**: Frontend framework to build the user interface.
- **Node.js**: Backend JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs on the backend.
- **MongoDB**: NoSQL database for storing user and content data.
- **TailwindCSS**: Utility-first CSS framework for designing the responsive UI.

## 🔐 Features
- **Authentication with JWT**: Secure login and signup system using JSON Web Tokens (JWT) for user authentication.
- **Responsive UI**: Mobile-first, responsive design using TailwindCSS, ensuring compatibility across devices.
- **Fetch Movies and TV Shows**: Dynamically fetch data from The Movie Database (TMDb) API to display movies and TV shows.
- **Search for Actors and Movies**: Users can search for actors and movies using a search bar.
- **Watch Trailers**: Display movie and TV show trailers from TMDb directly on the platform.
- **Fetch Search History**: Store and display the search history of users for easy access to previously searched content.
- **Get Similar Movies/TV Shows**: Based on a user's selection, fetch similar movies or TV shows from the API.
- **Awesome Landing Page**: A beautiful, engaging landing page to attract users to explore content.

## ⚙️ Setup .env File

Create a `.env` file in the root of your project directory and add the following environment variables:

```bash
PORT=5000  # The port number for your backend server to run on
MONGO_URI=your_mongo_uri  # MongoDB connection URI
NODE_ENV=development  # Set the environment to development for local setup
JWT_SECRET=your_jwt_secret  # Secret key used to sign JWT tokens
TMDB_API_KEY=your_tmdb_api_key  # API key for fetching data from The Movie Database (TMDb)


npm run build


npm run start



### Key Sections in the README:
1. **Tech Stack**: Lists all technologies used in the project (React, Node, Express, MongoDB, TailwindCSS).
2. **Features**: Highlights key features like authentication, movie fetching, and trailers.
3. **Setup `.env` file**: Provides the required environment variables needed to run the app.
4. **Running the app locally**: Instructions to build and start the app locally.
