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
import AddBuilding from "./AddBuilding";
import CustomModal from "../../components/CustomModal";
import ConfirmBox from "../../components/ConfirmBox";
import {
  useDeleteBuildingMutation,
  useGetBuildingListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";

const Buildings = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: buildingList } = useGetBuildingListQuery({});
  const [currentBuilding, setCurrentBuilding] = useState<string>("");
  const [buildingId, setBuildingId] = useState<string>("");
  const [deleteBuilding] = useDeleteBuildingMutation();

  const handleRouteAddBuildings = () => {
    setOpen(true);
    setCurrentBuilding("");
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenUpdateModal = (item: any) => {
    setCurrentBuilding(item);
    setOpen(true);
  };

  const handlOpenDeleteConfirm = (item: any) => {
    setBuildingId(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteBuildings = async () => {
    const deleteRequestObj = {
      url: `buildings/${buildingId}`,
    };
    try {
      const resp: any = await deleteBuilding(deleteRequestObj).unwrap();
      if (resp.status === 2005) {
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
    setCurrentBuilding("");
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
        <h1 className="text-2xl font-bold">Buildings</h1>
        <Button variant="contained" onClick={handleRouteAddBuildings}>
          Add Building
        </Button>
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          sx={{ minWidth: 650, maxHeight: "72vh" }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Buildings</TableCell>
                <TableCell>Descrition</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {buildingList?.data?.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.type}
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

      {/* this is add building form with drawer */}
      <CustomDrawer
        open={open}
        setOpen={setOpen}
        closeDrawer={handleCloseDrawer}
      >
        <AddBuilding setOpen={setOpen} currentBuilding={currentBuilding} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteBuildings}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Building?"
        />
      </CustomModal>
    </>
  );
};

export default Buildings;
