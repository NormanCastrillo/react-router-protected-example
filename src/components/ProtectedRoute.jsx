import { Navigate,Outlet } from "react-router-dom";

export const ProtectedRoute = ({ isAuthenticated, children, redirectTo = "/landing" }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children:<Outlet/>;
};
