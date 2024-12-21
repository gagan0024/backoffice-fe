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
import AddSubBuildings from "./AddSubBuilding";
import CustomModal from "../../components/CustomModal";
import ConfirmBox from "../../components/ConfirmBox";
import {
  useDeleteSubBuildingMutation,
  useGetSubBuildingListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import CustomSkeleton from "../../components/CustomSkeleton";

const SubBuildings = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: subBuildingDataList, isFetching } = useGetSubBuildingListQuery(
    {}
  );
  const [subBuildingId, setSubBuildingId] = useState<string>("");
  const [updateSubBuildingId, setUpdateSubBuildingId] = useState<string>("");
  const [deleteSubBuilding] = useDeleteSubBuildingMutation();

  const handleRouteAddBuildings = () => {
    setOpen(true);
    setUpdateSubBuildingId("");
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenEditModal = (item: any) => {
    setUpdateSubBuildingId(item);
    setOpen(true);
  };

  const handleOpenDeleteSubBuildings = (item: any) => {
    setSubBuildingId(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteSubBuildings = async () => {
    const deleteRequestObj = {
      url: `sub-buildings/${subBuildingId}`,
    };
    try {
      const resp: any = await deleteSubBuilding(deleteRequestObj).unwrap();
      if (resp.status === 2015) {
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
        <h1 className="text-2xl font-bold">Sub-Buildings</h1>
        <Button variant="contained" onClick={handleRouteAddBuildings}>
          Add Sub-Building
        </Button>
      </Box>
      {isFetching ? (
        <CustomSkeleton />
      ) : (
        <Box>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 650, maxHeight: "70vh" }}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Sub-Buildings</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subBuildingDataList?.data?.map((item: any, index: number) => (
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
                        onClick={() => handleOpenEditModal(item)}
                      >
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="warning"
                        onClick={() => handleOpenDeleteSubBuildings(item)}
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
        <AddSubBuildings
          setOpen={setOpen}
          updateSubBuildingId={updateSubBuildingId}
        />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteSubBuildings}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Sub Building?"
        />
      </CustomModal>
    </>
  );
};

export default SubBuildings;
