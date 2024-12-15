import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
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
import CloseIcon from "@mui/icons-material/Close";
import CustomDrawer from "../../components/CustomDrawer";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { useState } from "react";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import CustomModal from "../../components/CustomModal";
import ConfirmBox from "../../components/ConfirmBox";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Product 1", 159, 6.0, 24, 4.0),
  createData("Product 2", 237, 9.0, 37, 4.3),
  createData("Product 3", 262, 16.0, 24, 6.0),
  createData("Product 4", 305, 3.7, 67, 4.3),
  createData("Product 5", 356, 16.0, 49, 3.9),
];

const top100Films = [{ title: "Ground floor" }];

const Product = () => {
  const methods = useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [productTypeArray, setProductTypeArray] = useState<string[]>([]);
  const [vendorArray, setVendorArray] = useState<string[]>([]);
  const { setValue, control } = methods;

  const handleProductTypeChange = (event: any, newValue: string[]) => {
    setProductTypeArray(newValue);
    setValue("product-type", newValue);
    console.log(event);
  };

  const handleVendorChange = (event: any, newValue: string[]) => {
    setVendorArray(newValue);
    setValue("vendor", newValue);
    console.log(event);
  };

  const handleCloseModalForAddLocation = () => {
    setOpen(false);
  };

  const handleOpenModalForAddLocation = () => {
    setOpen(true);
  };
  const handleEditLocation = (item: any) => {
    console.log(item);
    setIsEditing(true);
    setOpen(true);
  };
  const handleOpenDeleteBox = (item: any) => {
    console.log(item);
    setOpenDeleteModal(true);
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log("Product Type Array:", productTypeArray);
    console.log("Vendor Array:", vendorArray);
  };

  const handleDeleteProducts = () => {
    alert("Please Integrate API");
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((item: any, index: any) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
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

      <CustomDrawer
        open={open}
        setOpen={setOpen}
        closeDrawer={handleCloseModalForAddLocation}
      >
        <Box className="flex flex-col gap-8">
          <Box className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {isEditing ? "Edit Product" : "Add Product"}
            </h2>
            <IconButton onClick={handleCloseModalForAddLocation}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-6"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <Box className="flex items-center gap-4">
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="service"
                    options={["Option 1", "Option 2", "Option 3"]}
                    label="Service"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="sub-service"
                    options={["Option 1", "Option 2", "Option 3"]}
                    label="Sub Service"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              <Box className="flex flex-col gap-4">
                <RHFTextField
                  name="product-name"
                  label="Product Name"
                  rules={{
                    required: "This field is required",
                  }}
                />

                <Controller
                  name="product-type"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={top100Films.map((option) => option.title)}
                      value={productTypeArray}
                      onChange={handleProductTypeChange}
                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField
                          {...params}
                          name="product-type"
                          label="Product Type"
                          rules={{
                            required: "This field is required",
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Box>

              <Box className="flex gap-4 items-center">
                <RHFTextField
                  name="capacity"
                  label="Capacity"
                  rules={{
                    required: "This field is required",
                  }}
                />

                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="unit"
                    options={["Option 1", "Option 2", "Option 3"]}
                    label="Unit"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              <Box>
                <Controller
                  name="vendor"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      multiple
                      options={top100Films.map((option) => option.title)}
                      value={vendorArray}
                      onChange={handleVendorChange}
                      freeSolo
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <RHFTextField
                          {...params}
                          name="vendor"
                          label="Vendor"
                          rules={{
                            required: "This field is required",
                          }}
                        />
                      )}
                    />
                  )}
                />
              </Box>
              <Button variant="contained" fullWidth size="large" type="submit">
                {isEditing ? "Update" : "Submit"}
              </Button>
            </form>
          </FormProvider>
        </Box>
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
