import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedAuthRouteProps {
  children: ReactNode;
}

export default function ProtectedAuthRoute({
  children,
}: ProtectedAuthRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}
