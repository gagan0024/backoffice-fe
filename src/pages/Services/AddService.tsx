import { Box, Button, IconButton } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddBuildingMutation,
  useUpdateBuildingMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  type: string;
  description: string;
}

const AddService = (props: any) => {
  const { setOpen, currentBuilding } = props;
  const [AddBuildingData] = useAddBuildingMutation();
  const [UpdateBuildingData] = useUpdateBuildingMutation();

  const methods = useForm<FormValues>();
  const { reset, handleSubmit, setValue } = methods;

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: currentBuilding?.id
        ? `buildings/${currentBuilding.id}`
        : "buildings",
      body: {
        type: data.type,
        description: data.description,
      },
    };
    try {
      if (currentBuilding?.id) {
        const resp: any = await UpdateBuildingData(reqObject).unwrap();
        if (resp.status === 2002) {
          toast.success("Building updated successfully");
        }
      } else {
        const resp: any = await AddBuildingData(reqObject).unwrap();
        if (resp.status === 2001) {
          toast.success("Building added successfully");
        }
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (currentBuilding?.id) {
      setValue("type", currentBuilding.type);
      setValue("description", currentBuilding.description);
    } else {
      reset();
    }
  }, [currentBuilding, setValue, reset]);

  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };

  return (
    <Box className="w-full bg-white">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {currentBuilding?.id ? "Update Service" : "Add Service"}
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
          </Box>

          {/* Submit Button */}
          <Box>
            <Button type="submit" size="large" variant="contained" fullWidth>
              {currentBuilding?.id ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddService;
