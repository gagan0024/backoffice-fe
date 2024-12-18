import { Box, Button, IconButton } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddBuildingMutation,
  useUpdateBuildingMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";

interface FormValues {
  type: string;
  description: string;
}

const AddBuilding = (props: any) => {
  const [fileValue, setFileValue] = useState<File | null>(null);
  const { setOpen, currentBuilding, isEditing } = props;

  const [AddBuildingData] = useAddBuildingMutation();
  const [UpdateBuildingData] = useUpdateBuildingMutation();

  const methods = useForm<FormValues>();
  const { reset, handleSubmit } = methods;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      setFileValue(file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: isEditing ? `buildings/${currentBuilding}` : "buildings",
      body: { type: data.type, description: data.description },
    };

    try {
      if (isEditing) {
        await UpdateBuildingData(reqObject).unwrap();
        toast.success("Building updated successfully");
      } else {
        await AddBuildingData(reqObject).unwrap();
        toast.success("Building added successfully");
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Box className="w-full bg-white">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {isEditing ? "Edit Building" : "Add Building"}
        </h2>
        <IconButton onClick={handleCloseModal}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Form */}
      <FormProvider {...methods}>
        <form
          className="flex gap-4 flex-col w-full justify-between h-[75vh]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box className="flex flex-col gap-4">
            {/* Sub-Building Type Field */}
            <RHFTextField
              name="type"
              label="Building Type"
              rules={{ required: "This field is required" }}
            />

            {/* Description Field */}
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
              rules={{ required: "This field is required" }}
            />

            {/* File Upload */}
            <Box>
              <input
                accept="image/*"
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload">
                <Button variant="outlined" component="span">
                  {fileValue ? "Change File" : "Upload File"}
                </Button>
              </label>
            </Box>
          </Box>

          {/* Submit Button */}
          <Box>
            <Button type="submit" size="large" variant="contained" fullWidth>
              {isEditing ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddBuilding;
