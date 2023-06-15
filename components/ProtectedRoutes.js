import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth;
  const { push, asPath } = useRouter();
  const isProtectedPages = asPath === "/posts/my-posts";
  console.log("user", user);
  // console.log(!user && isProtectedPages);
  console.log("!user", !user);
  console.log("isProtectedPages", isProtectedPages);
  useEffect(() => {
    if (!user && isProtectedPages) {
      push("/");
    }
  }, [user, isProtectedPages]);

  return <> {user || !isProtectedPages ? children : null}</>;
};

export default ProtectedRoute;
