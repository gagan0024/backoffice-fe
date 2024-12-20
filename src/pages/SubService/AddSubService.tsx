import { Box, Button, IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import { FormProvider, useForm } from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import {
  useAddSubBuildingMutation,
  useGetBuildingListQuery,
  useUpdateSubBuildingMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  building_id: any;
  type: string;
  description: string;
}

const AddSubService = (props: any) => {
  const { setOpen, updateSubBuildingId } = props;
  const methods = useForm<FormValues>();
  const { reset, handleSubmit, setValue } = methods;
  const [addSubBuilding] = useAddSubBuildingMutation();
  const [updateSubBuilding] = useUpdateSubBuildingMutation();
  const { data: buildingList } = useGetBuildingListQuery({});

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: updateSubBuildingId?.id
        ? `sub-buildings/${updateSubBuildingId.id}`
        : "sub-buildings",
      body: {
        building_id: data.building_id.value,
        type: data.type,
        description: data.description,
      },
    };
    try {
      if (updateSubBuildingId?.id) {
        const resp: any = await updateSubBuilding(reqObject).unwrap();
        if (resp.status === 2014) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addSubBuilding(reqObject).unwrap();
        if (resp.status === 2011) {
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
    if (updateSubBuildingId?.id) {
      let tempType = buildingList?.data?.find(
        (item: any) => item.id === updateSubBuildingId.building_id
      );
      let newObj = {
        label: tempType?.type,
        value: tempType?.id,
      };
      setValue("type", updateSubBuildingId.type);
      setValue("description", updateSubBuildingId.description);
      setValue("building_id", newObj);
    } else {
      reset();
    }
  }, [updateSubBuildingId.id, setValue, reset, buildingList]);

  const handleCloseModalForAddBuildings = () => {
    setOpen(false);
    reset();
  };

  return (
    <Box className="w-full bg-white">
      {/* Header */}
      <Box className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          {updateSubBuildingId?.id ? "Edit Sub-Service" : "Add Sub-Service"}
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
                name="building_id"
                options={
                  buildingList?.data?.map((item: any) => ({
                    label: item.type || "Unknown",
                    value: item.id,
                  })) || []
                }
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.value === value?.value
                }
                label="Building"
                rules={{ required: "This field is required" }}
              />
            </FormControl>

            {/* Sub-Building Type Field */}
            <RHFTextField
              name="type"
              label="Sub-Building Type"
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
              {updateSubBuildingId?.id ? "Update" : "Submit"}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default AddSubService;
