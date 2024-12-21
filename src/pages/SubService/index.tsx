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
  useDeleteSubServiceMutation,
  useGetSubServiceListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import AddSubService from "./AddSubService";
import CustomSkeleton from "../../components/CustomSkeleton";

const SubService = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: subServiceDataList, isFetching } = useGetSubServiceListQuery(
    {}
  );
  const [subServiceID, setSubServiceID] = useState<string>("");
  const [updateSubServiceID, setUpdateSubServiceID] = useState<string>("");
  const [deleteSubService] = useDeleteSubServiceMutation();

  const handleRouteAddBuildings = () => {
    setOpen(true);
    setUpdateSubServiceID("");
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenEditModal = (item: any) => {
    setUpdateSubServiceID(item);
    setOpen(true);
  };

  const handleOpenDeleteSubServices = (item: any) => {
    setSubServiceID(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteSubServices = async () => {
    const deleteRequestObj = {
      url: `sub-services/${subServiceID}`,
    };
    try {
      const resp: any = await deleteSubService(deleteRequestObj).unwrap();
      if (resp.status === 3015) {
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
        <h1 className="text-2xl font-bold">Sub-Service</h1>
        <Button variant="contained" onClick={handleRouteAddBuildings}>
          Add Sub-Service
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
                  <TableCell>Sub-Services</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subServiceDataList?.data?.map((item: any, index: number) => (
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
                        onClick={() => handleOpenEditModal(item)}
                      >
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="warning"
                        onClick={() => handleOpenDeleteSubServices(item)}
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
        <AddSubService
          setOpen={setOpen}
          updateSubServiceID={updateSubServiceID}
        />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteSubServices}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Sub Building?"
        />
      </CustomModal>
    </>
  );
};

export default SubService;
