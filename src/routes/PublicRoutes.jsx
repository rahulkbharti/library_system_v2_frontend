// src/routes/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";

export default function PublicRoutes({children}) {
  const isAuthenticated  = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/" replace /> : children;
}
