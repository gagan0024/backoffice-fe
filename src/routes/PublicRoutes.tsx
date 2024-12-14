import { Navigate, useRoutes } from "react-router-dom";
import Login from "../pages/login/Login";

const PublicRoutes = () => {
  const allPublicRoutes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Navigate replace to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ]);
  return allPublicRoutes;
};

export default PublicRoutes;
