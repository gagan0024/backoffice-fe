import { Box, Button, IconButton } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddServiceMutation,
  useUpdateServiceMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  name: string;
  description: string;
}

const AddService = (props: any) => {
  const { setOpen, currentService } = props;
  const [AddServiceData] = useAddServiceMutation();
  const [UpdateServiceData] = useUpdateServiceMutation();
  const methods = useForm<FormValues>();
  const { reset, handleSubmit, setValue } = methods;

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: currentService?.id ? `services/${currentService.id}` : "services",
      body: {
        name: data.name,
        description: data.description,
      },
    };
    try {
      if (currentService?.id) {
        const resp: any = await UpdateServiceData(reqObject).unwrap();
        if (resp.status === 3004) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await AddServiceData(reqObject).unwrap();
        if (resp.status === 3001) {
          toast.success(resp.message);
        }
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (currentService?.id) {
      setValue("name", currentService.name);
      setValue("description", currentService.description);
    } else {
      reset();
    }
  }, [currentService, setValue, reset]);

  const handleCloseModal = () => {
    setOpen(false);
    reset();
  };

  return (
    <Box className="w-full bg-white">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {currentService?.id ? "Update Service" : "Add Service"}
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
              name="name"
              label="Service"
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
              {currentService?.id ? "Update Service" : "Add Service"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddService;
