import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout";
import Buildings from "../pages/buldings";
import Locations from "../pages/location";
import Product from "../pages/product/Product";
import SubBuildings from "../pages/subBuildings";
import Levels from "../pages/level";
import Rooms from "../pages/room";
import FinalDesign from "../pages/finalDesign";

const PrivateRoutes = () => {
  const allPrivateRoutes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate replace to="/home" />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "locations",
          element: <Locations />,
        },
        {
          path: "buildings",
          element: <Buildings />,
        },
        {
          path: "sub-buildings",
          element: <SubBuildings />,
        },
        {
          path: "levels",
          element: <Levels />,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "product",
          element: <Product />,
        },
        {
          path: "final-design-form",
          element: <FinalDesign />,
        },
        {
          path: "*",
          element: <Navigate to="/home" />,
        },
      ],
    },
  ]);
  return allPrivateRoutes;
};

export default PrivateRoutes;
