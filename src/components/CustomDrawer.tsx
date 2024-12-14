import { Box } from "@mui/material";
import Drawer from "@mui/material/Drawer";

const CustomDrawer = (props: any) => {
  const { children, open, closeDrawer } = props;

  return (
    <>
      <Drawer open={open} onClose={closeDrawer} anchor="right">
        <Box className="w-[30rem] p-8">{children}</Box>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
