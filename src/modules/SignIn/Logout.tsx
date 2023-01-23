import React from "react";
import { removeToken } from "utils/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  React.useEffect(() => {
    removeToken();
    navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
