import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { accessAdminTokken } from "../redux/slices/loingSlice";
import CustomModal from "./CustomModal";
import ConfirmBox from "./ConfirmBox";

export default function Logout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showConfirmBox, setShowConfirmBox] = useState<boolean>(false);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenConfirmModal = () => {
    setShowConfirmBox(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmBox(false);
    setAnchorEl(null);
  };

  const handleClearToken = () => {
    dispatch(accessAdminTokken(null));
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <PowerSettingsNewIcon />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleOpenConfirmModal}>Logout</MenuItem>
      </Menu>

      <CustomModal
        openModal={showConfirmBox}
        handleClose={handleCloseConfirmModal}
      >
        <ConfirmBox
          handlelogin={handleClearToken}
          handleCloselogin={handleCloseConfirmModal}
          message="Are you sure,You want to logout!"
        />
      </CustomModal>
    </>
  );
}
