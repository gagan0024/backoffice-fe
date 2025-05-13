import { Box, Button, FormControl, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import {
  useAddItemMutation,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useGetSubServiceListQuery,
  useUpdateItemMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  name: any;
  description: string;
  sub_service_id: any;
  sub_service: any;
  service: any;
}

const AddItems = (props: any) => {
  const { setOpen, itemsData } = props;
  const methods = useForm<FormValues>();
  const {
    watch,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;
  const [updateItem] = useUpdateItemMutation();
  const [addItem] = useAddItemMutation();
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;
  const { data: subServiceListData } = useGetSubServiceListQuery(
    {}
  );
  const selectedSubService = watch("sub_service");
  const newSelectedSubService = selectedSubService?.value;

  const { data: subServiceListByID } =
    useGetSubServiceListByIDQuery(
      { service_id: newSelectedService },
      { skip: !newSelectedService }
    );

  const handleCloseModalForAddItem = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: itemsData?.id ? `items/${itemsData.id}` : "items",
      body: {
        name: data.name,
        description: data.description,
        sub_service_id: newSelectedSubService,
      },
    };
    try {
      if (itemsData?.id) {
        const resp: any = await updateItem(reqObject).unwrap();
        if (resp.status === 2031) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addItem(reqObject).unwrap();
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

  useEffect(() => {
    if (itemsData?.id) {
      const subServiceSetValue = subServiceListData?.data.find(
        (item: any) => item.id === itemsData?.sub_service_id?.id
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

      setValue("name", itemsData.name);
      setValue("description", itemsData.description);
      setValue("service", serviceObj);
      setValue("sub_service", subServiceObj);
    } else {
      reset();
    }
  }, [itemsData.id, setValue, reset, serviceList]);

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Box className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {itemsData.id ? "Update Product" : "Add Product"}
          </h2>
          <IconButton onClick={handleCloseModalForAddItem}>
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
                  label="Item Name"
                  rules={{
                    required: "This field is required",
                  }}
                />
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
              {itemsData.id ? "Update Item" : "Add Item"}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddItems;
