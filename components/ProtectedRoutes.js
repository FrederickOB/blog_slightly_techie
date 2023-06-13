import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
  const protectedPages = ["/posts/my-posts"];
  const { user } = useAuth;
  const { push, asPath } = useRouter();
  const path = asPath?.split("?")[0];
  const isProtectedPages = protectedPages.includes(path);
  useEffect(() => {
    if (!user && isProtectedPages) {
      push("/");
    }
  }, [user, isProtectedPages]);

  return <> {user || !isProtectedPages ? children : null}</>;
};

export default ProtectedRoute;
