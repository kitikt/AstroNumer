import { Navigate } from "react-router-dom";

import { ReactNode } from "react";

const ProtectedFormRoute = ({ children }: { children: ReactNode }) => {
  const numerologyData = localStorage.getItem("numerologyData");

  if (numerologyData) {
    return <Navigate to="/numerology" replace />;
  }

  return children;
};

export default ProtectedFormRoute;
