import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

const Header = () => {
  const navigate = useNavigate();
  const handleDirectHome = () => {
    navigate("/home");
  };

  return (
    <>
      <header className="w-full h-16 bg-white shadow-md flex items-center px-4 justify-between">
        <Box
          className="flex items-center cursor-pointer"
          onClick={handleDirectHome}
        >
          <Box></Box>
          <Box className="text-2xl font-bold text-gray-700">Buildings</Box>
        </Box>
        <Box className="flex items-center gap-2">
          <Box className="w-8 h-8 rounded bg-slate-400 shadow-md"></Box>
          <Box>
            <Logout />
          </Box>
        </Box>
      </header>
    </>
  );
};

export default Header;
