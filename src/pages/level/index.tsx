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
import AddLevels from "./AddLevel";
import {
  useDeleteLevelsMutation,
  useGetLevelsListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import CustomSkeleton from "../../components/CustomSkeleton";

const Levels = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: levelDataList, isFetching } = useGetLevelsListQuery({});
  const [updatelevelsObj, setUpdatelevelsObj] = useState<object>({});
  const [deleteLevels, setDeleteLevels] = useState<object>({});
  const [deleteLevelItem] = useDeleteLevelsMutation();

  const handleRouteAddLevels = () => {
    setOpen(true);
    setUpdatelevelsObj({});
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenUpdateModal = (item: any) => {
    setOpen(true);
    setUpdatelevelsObj(item);
  };

  const handlOpenDeleteConfirm = (item: any) => {
    setDeleteLevels(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteLevels = async () => {
    const deleteRequestObj = {
      url: `levels/${deleteLevels}`,
    };
    try {
      const resp: any = await deleteLevelItem(deleteRequestObj).unwrap();
      if (resp.status === 2025) {
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
        <h1 className="text-2xl font-bold">Levels</h1>
        <Button variant="contained" onClick={handleRouteAddLevels}>
          Add Level
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
                  <TableCell>Levels</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {levelDataList?.data?.map((item: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
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
        <AddLevels setOpen={setOpen} updatelevelsObj={updatelevelsObj} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteLevels}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Level?"
        />
      </CustomModal>
    </>
  );
};

export default Levels;
