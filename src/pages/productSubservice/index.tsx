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
  useDeleteProductSubServiceMutation,
  useGetProductSubServiceListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import CustomSkeleton from "../../components/CustomSkeleton";
import AddProductSubService from "./AddProductSubService";

const ProductSubService = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: productSubServiceDataList, isFetching } =
    useGetProductSubServiceListQuery({});
  const [productSubServiceID, setProductSubServiceID] = useState<string>("");
  const [updateProductSubServiceID, setUpdateProductSubServiceID] =
    useState<string>("");
  const [deleteProductSubService] = useDeleteProductSubServiceMutation();

  const handleAddProductSubService = () => {
    setOpen(true);
    setUpdateProductSubServiceID("");
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const handleOpenEditModal = (item: any) => {
    setUpdateProductSubServiceID(item);
    setOpen(true);
  };

  const handleOpenDeleteProductSubServices = (item: any) => {
    setProductSubServiceID(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteSubServices = async () => {
    const deleteRequestObj = {
      url: `product-sub-services/${productSubServiceID}`,
    };
    try {
      const resp: any = await deleteProductSubService(
        deleteRequestObj
      ).unwrap();
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
        <h1 className="text-2xl font-bold">Product Sub-Service</h1>
        <Button variant="contained" onClick={handleAddProductSubService}>
          Add Product Sub-Service
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
                  <TableCell>Product Sub-Services</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productSubServiceDataList?.data?.map(
                  (item: any, index: number) => (
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
                          onClick={() =>
                            handleOpenDeleteProductSubServices(item)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
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
        <AddProductSubService
          setOpen={setOpen}
          updateProductSubServiceID={updateProductSubServiceID}
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

export default ProductSubService;
