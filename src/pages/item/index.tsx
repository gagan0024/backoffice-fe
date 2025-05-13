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
  useDeleteItemMutation,
  useGetItemListQuery,
} from "../../redux/api/api";
import AddItems from "./AddItems";

const Items = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const { data: itemsDataList, isFetching } = useGetItemListQuery({});
  const [itemsData, setItemsData] = useState<object>({});
  const [itemsDataDelete, setItemsDataDelete] = useState<object>({});
  const [deleteItem] = useDeleteItemMutation();

  const handleCloseModalForAddItem = () => {
    setOpen(false);
  };

  const handleOpenModalForAddItem = () => {
    setOpen(true);
    setItemsData({});
  };

  const handleEditItem = (item: any) => {
    setItemsData(item);
    setOpen(true);
  };

  const handleOpenDeleteBox = (item: any) => {
    setItemsDataDelete(item.id);
    setOpenDeleteModal(true);
  };

  const handleDeleteItems = async () => {
    const deleteRequestObj = {
      url: `items/${itemsDataDelete}`,
    };
    try {
      const resp: any = await deleteItem(deleteRequestObj).unwrap();
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
        <h1 className="text-2xl font-bold">Items</h1>
        <Button variant="contained" onClick={handleOpenModalForAddItem}>
          Add Item
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
                <TableCell>Item Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsDataList?.data?.map((item: any, index: any) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" className="capitalize">
                    {`${item.name}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.description}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      onClick={() => handleEditItem(item)}
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
        closeDrawer={handleCloseModalForAddItem}
      >
        <AddItems setOpen={setOpen} itemsData={itemsData} />
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteItems}
          handleCloselogin={handleCloseDeleteConfirm}
          message="Are you sure, you want to delete this Item?"
        />
      </CustomModal>
    </>
  );
};

export default Items;
