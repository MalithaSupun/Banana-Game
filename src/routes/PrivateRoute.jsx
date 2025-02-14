import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken"); // Check if token exists

  return authToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;