import React from "react";
import { Route, Navigate } from "react-router-dom";

// Function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  return token !== null; // Return true if token exists
};

// ProtectedRoute component to handle protected routes
const ProtectedRoute = ({ element, ...rest }: any) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/" />}
    />
  );
};

export default ProtectedRoute;
