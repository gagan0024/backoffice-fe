import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { style } from "../utils";

const CustomModal = (props: any) => {
  const { children, openModal, setOpenModal } = props;
  const handleClose = () => setOpenModal(false);
  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </>
  );
};

export default CustomModal;
