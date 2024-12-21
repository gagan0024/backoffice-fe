import { Box, Button, IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import { FormProvider, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddSubServiceMutation,
  useGetServiceListQuery,
  useUpdateSubServiceMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  service: any;
  name: string;
  description: string;
}

const AddSubService = (props: any) => {
  const { setOpen, updateSubServiceID } = props;
  const methods = useForm<FormValues>();
  const { reset, handleSubmit, setValue } = methods;
  const [addSubBuilding] = useAddSubServiceMutation();
  const [updateSubBuilding] = useUpdateSubServiceMutation();
  const { data: serviceList } = useGetServiceListQuery({});

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: updateSubServiceID?.id
        ? `sub-services/${updateSubServiceID.id}`
        : "sub-services",
      body: {
        service_id: data.service.value,
        name: data.name,
        description: data.description,
      },
    };
    try {
      if (updateSubServiceID?.id) {
        const resp: any = await updateSubBuilding(reqObject).unwrap();
        if (resp.status === 3014) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addSubBuilding(reqObject).unwrap();
        if (resp.status === 3011) {
          toast.success(resp.message);
        }
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Pre-fill form fields when editing
  useEffect(() => {
    if (updateSubServiceID?.id) {
      let tempType = serviceList?.data?.find(
        (item: any) => item.id === updateSubServiceID.service_id
      );
      let newObj = {
        label: tempType?.name,
        value: tempType?.id,
      };
      setValue("name", updateSubServiceID.name);
      setValue("description", updateSubServiceID.description);
      setValue("service", newObj);
    } else {
      reset();
    }
  }, [updateSubServiceID.id, setValue, reset, serviceList]);

  const handleCloseModalForAddBuildings = () => {
    setOpen(false);
    reset();
  };

  return (
    <Box className="w-full bg-white">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {updateSubServiceID?.id ? "Edit Sub-Service" : "Add Sub-Service"}
        </h2>
        <IconButton onClick={handleCloseModalForAddBuildings}>
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
            <FormControl fullWidth>
              <RHFAutocomplete
                name="service"
                options={
                  serviceList?.data?.map((item: any) => ({
                    label: item.name || "Unknown",
                    value: item.id,
                  })) || []
                }
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.value === value?.value
                }
                label="Service"
                rules={{ required: "This field is required" }}
              />
            </FormControl>

            {/* Sub-Building Type Field */}
            <RHFTextField
              name="name"
              label="Sub-Service"
              rules={{
                required: "This field is required",
              }}
            />

            {/* Description Field */}
            <RHFTextField
              name="description"
              label="Description"
              multiline
              rows={4}
              rules={{
                required: "This field is required",
              }}
            />
          </Box>

          {/* Submit Button */}
          <Box>
            <Button type="submit" size="large" variant="contained" fullWidth>
              {updateSubServiceID?.id ? "Edit Sub-Service" : "Add Sub-Service"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddSubService;
