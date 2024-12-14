import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";

const Layout = () => {
  return (
    <>
      <Box>
        <Header />
        <Box className="w-full flex">
          <SideBar />
          <Box className="p-6 w-full">
            <Suspense fallback="Loading...">
              <Outlet />
            </Suspense>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default Layout;
