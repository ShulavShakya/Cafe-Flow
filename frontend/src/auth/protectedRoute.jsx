import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext.jsx";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role?.role_name)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
