import { useAuthStore } from "../../store/authUser"; // Importing the custom hook to access authentication store
import AuthScreen from "./AuthScreen"; // Importing the AuthScreen component
import HomeScreen from "./HomeScreen"; // Importing the HomeScreen component

const HomePage = () => {
  // Accessing the user state from the authentication store
  const { user } = useAuthStore();

  return (
    // Conditional rendering: if the user is authenticated, show HomeScreen, else show AuthScreen
    <>
      {user ? <HomeScreen /> : <AuthScreen />}
    </>
  );
};

export default HomePage; // Exporting the HomePage component
