import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/storage";

export default function PublicRoute({ isAuthPage, children }) {
  if (isAuthenticated() && isAuthPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
