import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken, clearAuthData } from "../utils/storage";

export default function PrivateRoute({ children }) {
  const location = useLocation();

  const token = getAuthToken();

  // No token → redirect to login
  if (!token) {
    clearAuthData();

    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // Token exists → allow access
  return children;
}
