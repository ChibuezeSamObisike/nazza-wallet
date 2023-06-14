import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getToken } from "utils/auth";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  if (isAuthenticated()) {
    return <>{children}</>;
  }
  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default AuthGuard;
