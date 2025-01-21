import { Box, Button, FormControl, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import {
  useAddActionMutation,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useGetSubServiceListQuery,
  useUpdateActionMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  name: any;
  description: string;
  sub_service_id: any;
  service: any;
  calculation_type: any;
  sub_service: any;
}

const AddActions = (props: any) => {
  const { setOpen, actionsData } = props;
  const methods = useForm<FormValues>();
  const {
    watch,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;
  const [updateAction] = useUpdateActionMutation();
  const [addAction] = useAddActionMutation();
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;
  const { data: subServiceListData } = useGetSubServiceListQuery({});
  const selectedSubService = watch("sub_service");
  const newSelectedSubService = selectedSubService?.value;

  const { data: subServiceListByID } = useGetSubServiceListByIDQuery(
    { service_id: newSelectedService },
    { skip: !newSelectedService }
  );

  const handleCloseModalForAddLocation = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: actionsData?.id ? `actions/${actionsData.id}` : "actions",
      body: {
        name: data.name,
        description: data.description,
        sub_service_id: newSelectedSubService,
        calculation_type: data.calculation_type.value,
      },
    };
    try {
      if (actionsData?.id) {
        const resp: any = await updateAction(reqObject).unwrap();
        if (resp.status === 2031) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addAction(reqObject).unwrap();
        if (resp.status === 3021) {
          toast.success(resp.message);
        }
      }
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const serviceOptions = (serviceList?.data || []).map((item: any) => ({
    label: item.name || "Unknown",
    value: item.id,
  }));

  const subServiceOptions = (subServiceListByID?.data || []).map(
    (item: any) => ({
      label: item.name || "Unknown",
      value: item.id,
    })
  );

  const calculationArray = [
    { id: 1, key: 1, label: "Building", value: "BUILDING" },
    { id: 2, key: 2, label: "Sub Building", value: "SUB_BUILDING" },
    { id: 3, key: 3, label: "Level", value: "LEVEL" },
    { id: 4, key: 4, label: "Room", value: "ROOM" },
  ];

  useEffect(() => {
    if (actionsData?.id) {
      const subServiceSetValue = subServiceListData?.data.find(
        (item: any) => item.id === actionsData?.sub_service_id?.id
      );
      let subServiceObj = {
        label: subServiceSetValue?.name,
        value: subServiceSetValue?.id,
      };

      const serviceSetValue = serviceList?.data?.find(
        (item: any) => item.id === subServiceSetValue?.service_id
      );

      let serviceObj = {
        label: serviceSetValue?.name,
        value: serviceSetValue?.id,
      };

      let caclObj = calculationArray.find(
        (item: any) => item.value === actionsData.calculation_type
      );
      setValue("name", actionsData.name);
      setValue("description", actionsData.description);
      setValue("service", serviceObj);
      setValue("sub_service", subServiceObj);
      setValue("calculation_type", caclObj);
    } else {
      reset();
    }
  }, [actionsData.id, setValue, reset, serviceList]);

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Box className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {actionsData ? "Update Action" : "Add Action"}
          </h2>
          <IconButton onClick={handleCloseModalForAddLocation}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form
            className="flex gap-4 flex-col w-full justify-between h-[75vh]"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box className="flex gap-4 flex-col">
              <Box className="flex items-center gap-4">
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="service"
                    options={serviceOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="service"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>

                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="sub_service"
                    options={subServiceOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Sub Service"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              <Box className="flex flex-col gap-4">
                <RHFTextField
                  name="name"
                  label="Action Name"
                  rules={{
                    required: "This field is required",
                  }}
                />
              </Box>

              <Box className="flex flex-col gap-4">
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="calculation_type"
                    options={calculationArray}
                    getOptionLabel={
                      (option) =>
                        typeof option === "string"
                          ? option
                          : option?.label || "" // Extracts the label property
                    }
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Calculation Type"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              <Box className="flex gap-4 items-center">
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  rules={{ required: "This field is required" }}
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              {actionsData ? "Update Action" : "Add Action"}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddActions;
