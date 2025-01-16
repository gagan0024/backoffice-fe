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
import CustomSkeleton from "../../components/CustomSkeleton";
import { toast } from "react-toastify";
import AddActions from "./AddAction";
import {
  useDeleteActionsMutation,
  useGetActionsListQuery,
} from "../../redux/api/api";

const Actions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: actionsDataList, isFetching } = useGetActionsListQuery({});
  const [actionsData, setActionsData] = useState<object>({});
  const [actionsDataDelete, setActionsDataDelete] = useState<object>({});
  const [deleteAction] = useDeleteActionsMutation();

  const handleCloseModalForAddLocation = () => {
    setOpen(false);
  };

  const handleOpenModalForAddLocation = () => {
    setOpen(true);
  };

  const handleEditLocation = (item: any) => {
    setActionsData(item);
    setOpen(true);
  };

  const handleOpenDeleteBox = (item: any) => {
    setActionsDataDelete(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteActions = async () => {
    const deleteRequestObj = {
      url: `actions/${actionsDataDelete}`,
    };
    try {
      const resp: any = await deleteAction(deleteRequestObj).unwrap();
      if (resp.status === 4005) {
        toast.success(resp.message);
        setOpenDeleteModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete Product");
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
        <h1 className="text-2xl font-bold">Actions</h1>
        <Button variant="contained" onClick={handleOpenModalForAddLocation}>
          Add Actions
        </Button>
      </Box>

      {isFetching ? (
        <CustomSkeleton />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ minWidth: 650, maxHeight: "70vh" }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Action Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actionsDataList?.data?.map((item: any, index: any) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="capitalize">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleEditLocation(item)}
                    >
                      <EditNoteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={() => handleOpenDeleteBox(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <CustomDrawer
        open={open}
        setOpen={setOpen}
        closeDrawer={handleCloseModalForAddLocation}
      >
        <AddActions setOpen={setOpen} actionsData={actionsData} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteActions}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Product?"
        />
      </CustomModal>
    </>
  );
};

export default Actions;
