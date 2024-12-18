import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CustomDrawer from "../../components/CustomDrawer";
import { useState } from "react";
import CustomModal from "../../components/CustomModal";
import ConfirmBox from "../../components/ConfirmBox";
import AddRooms from "./AddRooms";
import { useGetRoomsListQuery } from "../../redux/api/api";

const Rooms = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: roomDataList } = useGetRoomsListQuery({});

  const handleRouteAddRoom = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenUpdateModal = () => {
    setOpen(true);
  };

  const handlOpenDeleteConfirm = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteRoom = () => {
    alert("please integrate API for Delete Items");
    setOpenDeleteModal(false);
  };

  const handleCloseDeleteConfirm = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        mb={2}
      >
        <h1 className="text-2xl font-bold">Rooms</h1>
        <Button variant="contained" onClick={handleRouteAddRoom}>
          Add Room
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper} sx={{ minWidth: 650, height: "72vh" }}>
          <Table  size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Rooms</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomDataList?.data?.map((item:any,index:number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="lowercase">
                    {item.name}
                  </TableCell>
                  <TableCell component="th" scope="row" className="lowercase">
                    {item.description}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={handleOpenUpdateModal}
                    >
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={handlOpenDeleteConfirm}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* this is add building form with drawer */}
      <CustomDrawer
        open={open}
        setOpen={setOpen}
        closeDrawer={handleCloseDrawer}
      >
        <AddRooms setOpen={setOpen} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteRoom}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Level?"
        />
      </CustomModal>
    </>
  );
};

export default Rooms;
