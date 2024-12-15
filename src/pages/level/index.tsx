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

function createData(name: string) {
  return { name };
}

const rows = [
  createData("Level 1"),
  createData("Level 2"),
  createData("Level 3"),
  createData("Level 4"),
  createData("Level 5"),
];

const Levels = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const handleRouteAddLevels = () => {
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

  const handleDeleteLevels = () => {
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
        <h1 className="text-2xl font-bold">Levels</h1>
        <Button variant="contained" onClick={handleRouteAddLevels}>
          Add Level
        </Button>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Levels</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
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
        <AddLevels setOpen={setOpen}/>
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
