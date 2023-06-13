import "@/styles/globals.css";
import { AuthContextProvider } from "../../context/AuthContext";
import ProtectedRoute from "../../components/ProtectedRoutes";
import Navbar from "../../components/NavBar/Navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ghana Tek Blog</title>
      </Head>
      <AuthContextProvider>
        <Navbar />
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      </AuthContextProvider>
    </>
  );
}
