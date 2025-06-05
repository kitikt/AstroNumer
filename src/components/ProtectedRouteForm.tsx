import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedFormRouteProps {
  children: ReactNode;
  dataKey: string;
  redirectPath: string;
}

const ProtectedFormRoute = ({
  children,
  dataKey,
  redirectPath,
}: ProtectedFormRouteProps) => {
  const formData = localStorage.getItem(dataKey);
  const location = useLocation();

  // Chỉ điều hướng nếu không phải đang ở redirectPath
  if (formData && location.pathname !== redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedFormRoute;
