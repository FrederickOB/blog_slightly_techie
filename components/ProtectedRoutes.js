import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const publicPages = ["/"];
  const { user } = useAuth;
  const { push, asPath } = useRouter();
  const path = asPath?.split("?")[0];
  const isPublicPath = publicPages.includes(path);
  console.log(!user && !isPublicPath);
  useEffect(() => {
    if (!user && !isPublicPath) {
      push("/");
    }
  }, [user, isPublicPath]);

  return <> {user || publicPages.includes(path) ? children : null}</>;
};

export default ProtectedRoute;
