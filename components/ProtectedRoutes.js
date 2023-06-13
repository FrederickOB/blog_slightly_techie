import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const publicPages = ["/", "login"];
  const { user } = useAuth;
  const { push, asPath } = useRouter;
  const path = asPath?.split("?")[0];
  const isPublicPath = publicPages.includes(path || "/");
  useEffect(() => {
    if (!user && !isPublicPath) {
      log("cant accessz");
      //   push("/login");
    }
  }, [push, user, isPublicPath]);

  return <> {user ? children : null}</>;
};

export default ProtectedRoute;
