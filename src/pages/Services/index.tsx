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
import {
  useDeleteServiceMutation,
  useGetServiceListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import AddService from "./AddService";
import CustomSkeleton from "../../components/CustomSkeleton";

const Service = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: serviceList, isFetching } = useGetServiceListQuery({});
  const [currentService, setCurrentService] = useState<string>("");
  const [serviceID, setServiceID] = useState<string>("");
  const [deleteService] = useDeleteServiceMutation();

  const handleRouteAddService = () => {
    setOpen(true);
    setCurrentService("");
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenUpdateModal = (item: any) => {
    setCurrentService(item);
    setOpen(true);
  };

  const handlOpenDeleteConfirm = (item: any) => {
    setServiceID(item.id);
    setOpenDeleteModal(true);
  };
  const handleDeleteService = async () => {
    const deleteRequestObj = {
      url: `services/${serviceID}`,
    };
    try {
      const resp: any = await deleteService(deleteRequestObj).unwrap();
      if (resp.status === 3005) {
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
    setCurrentService("");
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
        <h1 className="text-2xl font-bold">Service</h1>
        <Button variant="contained" onClick={handleRouteAddService}>
          Add Service
        </Button>
      </Box>
      {isFetching ? (
        <CustomSkeleton />
      ) : (
        <Box>
          <TableContainer
            component={Paper}
            sx={{ minWidth: 650, maxHeight: "72vh" }}
          >
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Services</TableCell>
                  <TableCell>Descrition</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceList?.data?.map((item: any, index: number) => (
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
        <AddService setOpen={setOpen} currentService={currentService} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteService}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Building?"
        />
      </CustomModal>
    </>
  );
};

export default Service;
