import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedUserTypes, userType }) => {
  // Check if the userType is allowed to access the route
  if (allowedUserTypes.includes(userType)) {
    return <Outlet />; // Render the route's children
  }
  return <Navigate to="/" replace />; // Redirect to login or home page
};

export default ProtectedRoute;
