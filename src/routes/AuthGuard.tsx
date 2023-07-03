import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getToken } from "utils/auth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  isAuthenticated("userToken");
  const location = useLocation();
  if (isAuthenticated("userToken")) {
    return <>{children}</>;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default AuthGuard;
