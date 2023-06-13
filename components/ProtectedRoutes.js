import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth;
  const { push, asPath } = useRouter();

  const isProtectedPages = asPath === "/posts/my-posts";
  useEffect(() => {
    if (!user && isProtectedPages) {
      push("/");
    }
  }, [user, isProtectedPages]);

  return <> {user || !isProtectedPages ? children : null}</>;
};

export default ProtectedRoute;
