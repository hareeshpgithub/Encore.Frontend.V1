import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const userToken = "hardcoded";
  // sessionStorage.getItem("userToken") || localStorage.getItem("userToken");

  return userToken ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoutes;
