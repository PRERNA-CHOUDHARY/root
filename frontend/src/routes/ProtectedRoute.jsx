/**
 * @file ProtectedRoute.jsx is the file that contains the ProtectedRoute component.
 */

// Import the necessary modules.
import { useContext } from "react";
import { Navigate } from "react-router-dom";

// Import the necessary context.
import { AuthContext } from "../Context/AuthContext";

// Define the ProtectedRoute component.
const ProtectedRoute = ({ children, allowed }) => {
  // Get the token and role from the context.
  const { token, role } = useContext(AuthContext);

  // Check if the role is allowed to access the route.
  const isAllowed = allowed.includes(role);

  // If the token is present and the role is allowed, render the children, else redirect to the login page.
  const accessibleRoute =
    token && isAllowed ? children : <Navigate to="/login" replace={true} />;

  return accessibleRoute;
};

export default ProtectedRoute;
