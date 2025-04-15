import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Check if the user is authenticated by checking the localStorage
  const token = localStorage.getItem("token");
  const isAuthenticated = token;
  // const isAuthenticated = localStorage.getItem("user");

  // If not authenticated, redirect to login or error page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default PrivateRoute;
