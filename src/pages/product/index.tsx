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
  useDeleteProductMutation,
  useGetProductListQuery,
} from "../../redux/api/api";
import AddProducts from "./AddProducts";

const Products = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: productsDataList, isFetching } = useGetProductListQuery({});
  const [productsData, setProductsData] = useState<object>({});
  const [productsDataDelete, setProductsDataDelete] = useState<object>({});
  const [deleteProduct] = useDeleteProductMutation();

  const handleCloseModalForAddProduct = () => {
    setOpen(false);
  };

  const handleOpenModalForAddProduct = () => {
    setOpen(true);
    setProductsData({});
  };

  const handleEditProduct = (item: any) => {
    setProductsData(item);
    setOpen(true);
  };

  const handleOpenDeleteBox = (item: any) => {
    setProductsDataDelete(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteProducts = async () => {
    const deleteRequestObj = {
      url: `products/${productsDataDelete}`,
    };
    try {
      const resp: any = await deleteProduct(deleteRequestObj).unwrap();
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
        <h1 className="text-2xl font-bold">Products</h1>
        <Button variant="contained" onClick={handleOpenModalForAddProduct}>
          Add Product
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
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productsDataList?.data?.map((item: any, index: any) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="capitalize">
                    {`${item.name}  (${item.capacity})`}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleEditProduct(item)}
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
        closeDrawer={handleCloseModalForAddProduct}
      >
        <AddProducts setOpen={setOpen} productsData={productsData} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteProducts}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Product?"
        />
      </CustomModal>
    </>
  );
};

export default Products;
