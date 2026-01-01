import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
