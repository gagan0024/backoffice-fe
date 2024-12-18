import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Button,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomDrawer from "../../components/CustomDrawer";
import CustomModal from "../../components/CustomModal";
import ConfirmBox from "../../components/ConfirmBox";
import {
  useAddLocationMutation,
  useDeleteLocationMutation,
  useUpdateLocationMutation,
  useGetLocationListQuery,
} from "../../redux/api/api";

interface FormValues {
  name: string;
}

const Locations = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [locationId, setLocationId] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [addLocation] = useAddLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [deleteLocation] = useDeleteLocationMutation();
  const { data: locationDataList }: any = useGetLocationListQuery({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>();

  const handleOpenModalForAddLocation = () => {
    setOpen(true);
    setIsEditing(false);
    setCurrentLocation(null);
    reset();
  };

  const handleCloseModalForAddLocation = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: isEditing ? `locations/${currentLocation.id}` : "locations",
      body: { name: data.name },
    };
    try {
      if (isEditing) {
        const resp: any = await updateLocation(reqObject).unwrap();
        if (resp) {
          toast.success("Location updated successfully");
        }
      } else {
        const resp: any = await addLocation(reqObject).unwrap();
        if (resp) {
          toast.success("Location added successfully");
        }
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleEditLocation = (item: any) => {
    setIsEditing(true);
    setCurrentLocation(item);
    setOpen(true);
  };

  useEffect(() => {
    if (isEditing && currentLocation) {
      setValue("name", currentLocation.name); // Dynamically set the form value
    }
  }, [isEditing, currentLocation, setValue]);

  const handleDeleteLocation = async () => {
    const deleteRequestObj = {
      url: `locations/${locationId}`,
    };
    try {
      const resp: any = await deleteLocation(deleteRequestObj).unwrap();
      if (resp.status === 1005) {
        toast.success("Successfully deleted location");
        setOpenDeleteModal(false);
      }
    } catch (error) {
      toast.error("Failed to delete location");
    }
  };

  const handleOpenDeleteBox = (item: any) => {
    setOpenDeleteModal(true);
    setLocationId(item.id);
  };

  const handleCloseDeleteBox = () => {
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
        <h1 className="text-2xl font-bold">Locations</h1>
        <Button variant="contained" onClick={handleOpenModalForAddLocation}>
          Add Location
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ minWidth: 650, height: "72vh" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Locations</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locationDataList?.data?.map((item: any, index: any) => (
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
              {isEditing ? "Edit Location" : "Add Location"}
            </h2>
            <IconButton onClick={handleCloseModalForAddLocation}>
              <CloseIcon />
            </IconButton>
          </Box>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="location"
              label="Location"
              variant="outlined"
              size="medium"
              {...register("name", { required: "Location is required" })}
              error={!!errors.name}
              helperText={errors.name ? String(errors.name.message) : undefined}
            />
            <Button variant="contained" fullWidth size="large" type="submit">
              {isEditing ? "Update" : "Submit"}
            </Button>
          </form>
        </Box>
      </CustomDrawer>

      <CustomModal openModal={openDeleteModal}>
        <ConfirmBox
          handlelogin={handleDeleteLocation}
          handleCloselogin={handleCloseDeleteBox}
          message="Are you sure, you want to delete this location?"
        />
      </CustomModal>
    </>
  );
};

export default Locations;
