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
  useDeleteProductMutation,
  useGetProductListQuery,
} from "../../redux/api/api";
import CustomSkeleton from "../../components/CustomSkeleton";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify";

const Product = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: productDataList, isFetching } = useGetProductListQuery({});
  const [productData, setProductData] = useState<object>({});
  const [productDataDelete, setProductDataDelete] = useState<object>({});
  const [deleteProduct] = useDeleteProductMutation();

  const handleCloseModalForAddLocation = () => {
    setOpen(false);
  };

  const handleOpenModalForAddLocation = () => {
    setOpen(true);
  };

  const handleEditLocation = (item: any) => {
    setProductData(item);
    setOpen(true);
  };

  const handleOpenDeleteBox = (item: any) => {
    setProductDataDelete(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteProducts = async() => {
    const deleteRequestObj = {
      url: `products/${productDataDelete}`,
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
        <Button variant="contained" onClick={handleOpenModalForAddLocation}>
          Add Product
        </Button>
      </Box>

      {isFetching ? (
        <CustomSkeleton />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productDataList?.data?.map((item: any, index: any) => (
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
                      onClick={() => handleEditLocation(item)}
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
        closeDrawer={handleCloseModalForAddLocation}
      >
        <AddProduct setOpen={setOpen} productData={productData} />
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

export default Product;
