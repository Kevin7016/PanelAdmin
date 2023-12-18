import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import { RootState } from "../../store";

export default function Protect({ invert = true }: { invert?: boolean }) {
  
  const isAuthenticated = useSelector((state:RootState) => state.auth.isAuthenticated);

  if (invert) return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  else return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}
