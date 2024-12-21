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
import {
  useDeleteRoomsMutation,
  useGetRoomsListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import CustomSkeleton from "../../components/CustomSkeleton";

const Rooms = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [deleteRoomId, setDeleteRoomId] = useState<string>("");
  const [RoomData, setRoomData] = useState<object>({});
  const { data: roomDataList, isFetching } = useGetRoomsListQuery({});
  const [deleteRooms] = useDeleteRoomsMutation();

  const handleRouteAddRoom = () => {
    setOpen(true);
    setRoomData({});
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenUpdateModal = (item: any) => {
    setRoomData(item);
    setOpen(true);
  };

  const handlOpenDeleteConfirm = (item: any) => {
    setOpenDeleteModal(true);
    setDeleteRoomId(item.id);
  };

  const handleDeleteRoom = async () => {
    const deleteRequestObj = {
      url: `rooms/${deleteRoomId}`,
    };
    try {
      const resp: any = await deleteRooms(deleteRequestObj).unwrap();
      if (resp.status === 2035) {
        toast.success(resp.message);
        setOpenDeleteModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete location");
    }
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
      {isFetching ? (
        <CustomSkeleton />
      ) : (
        <Box>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 650, height: "72vh" }}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Rooms</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomDataList?.data?.map((item: any, index: number) => (
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
                        onClick={() => handleOpenUpdateModal(item)}
                      >
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="warning"
                        onClick={() => handlOpenDeleteConfirm(item)}
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
      )}

      {/* this is add building form with drawer */}
      <CustomDrawer
        open={open}
        setOpen={setOpen}
        closeDrawer={handleCloseDrawer}
      >
        <AddRooms setOpen={setOpen} RoomData={RoomData} />
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
