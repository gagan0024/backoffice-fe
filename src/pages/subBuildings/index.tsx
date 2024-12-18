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
import { useGetSubBuildingListQuery } from "../../redux/api/api";

const SubBuildings = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: subBuildingDataList } = useGetSubBuildingListQuery({});
  console.log(subBuildingDataList, "subBuildingDataList");

  const handleRouteAddBuildings = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenEditModal = () => {
    setOpen(true);
  };

  const handleOpenDeleteSubBuildings = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteSubBuildings = () => {
    alert("please Integrate API for Delete Sub Buildings");
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
      <Box>
        <TableContainer component={Paper} sx={{ minWidth: 650, height: "72vh" }}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                      onClick={handleOpenEditModal}
                    >
                      <EditNoteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="warning"
                      onClick={handleOpenDeleteSubBuildings}
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
        <AddSubBuildings setOpen={setOpen} />
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
