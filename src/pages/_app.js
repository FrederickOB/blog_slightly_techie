import "@/styles/globals.css";
import { AuthContextProvider } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoutes";
import Navbar from "../../components/NavBar/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        {/* <ProtectedRoute> */}
        <Component {...pageProps} />
        {/* </ProtectedRoute> */}
      </AuthContextProvider>
    </>
  );
}
