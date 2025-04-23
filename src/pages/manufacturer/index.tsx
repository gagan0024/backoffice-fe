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
import {
  useDeleteManufacturerMutation,
  useGetManufacturerListQuery,
} from "../../redux/api/api";
import AddManufacturer from "./AddManufacturer";

const Manufacturer = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: manufacturerDataList, isFetching } =
    useGetManufacturerListQuery({});
  const [manufacturerData, setManufacturerData] = useState<object>({});
  const [manufacturerDataDelete, setManufacturerDataDelete] = useState<object>(
    {}
  );
  const [deleteManufacturer] = useDeleteManufacturerMutation();

  const handleCloseModalForAddManufacturer = () => {
    setOpen(false);
  };

  const handleOpenModalForAddManufacturer = () => {
    setOpen(true);
    setManufacturerData({});
  };

  const handleEditManufacturer = (item: any) => {
    setManufacturerData(item);
    setOpen(true);
  };

  const handleOpenDeleteBox = (item: any) => {
    setManufacturerDataDelete(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteManufacturer = async () => {
    const deleteRequestObj = {
      url: `manufacturer/${manufacturerDataDelete}`,
    };
    try {
      const resp: any = await deleteManufacturer(deleteRequestObj).unwrap();
      if (resp.status === 4005) {
        toast.success(resp.message);
        setOpenDeleteModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete Manufacturer");
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
        <h1 className="text-2xl font-bold">Manufacturer</h1>
        <Button variant="contained" onClick={handleOpenModalForAddManufacturer}>
          Add Manufacturer
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
                <TableCell>Manufacturer Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {manufacturerDataList?.data?.map((item: any, index: any) => (
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
                      onClick={() => handleEditManufacturer(item)}
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
        closeDrawer={handleCloseModalForAddManufacturer}
      >
        <AddManufacturer
          setOpen={setOpen}
          manufacturerData={manufacturerData}
        />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteManufacturer}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Manufacturer?"
        />
      </CustomModal>
    </>
  );
};

export default Manufacturer;
