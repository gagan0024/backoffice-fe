import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout";
import Buildings from "../pages/buldings";
import Locations from "../pages/location";
import SubBuildings from "../pages/subBuildings";
import Levels from "../pages/level";
import Rooms from "../pages/room";
import FinalDesign from "../pages/finalDesign";
import Service from "../pages/Services";
import SubService from "../pages/SubService";
import Actions from "../pages/actions";
import ProductSubservice from "../pages/productSubservice";
import Products from "../pages/product";
import Manufacturer from "../pages/manufacturer";
import FinalProduct from "../pages/finalProduct";
import Items from "../pages/item";
import FinalItem from "../pages/finalItem";

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
          path: "services",
          element: <Service />,
        },
        {
          path: "sub-services",
          element: <SubService />,
        },
        {
          path: "actions",
          element: <Actions />,
        },
        {
          path: "final-design-form",
          element: <FinalDesign />,
        },
        {
          path: "product",
          element: <Products />,
        },
        {
          path: "final-product-form",
          element: <FinalProduct />,
        },
        {
          path: "product-sub-services",
          element: <ProductSubservice />,
        },
        {
          path: "manufacturer",
          element: <Manufacturer />,
        },
        {
          path: "items",
          element: <Items />,
        },
        {
          path: "final-item-form",
          element: <FinalItem />,
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
