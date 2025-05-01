import { Box, Button, FormControl, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import {
  useAddManufacturerMutation,
  useAddProductMutation,
  useGetProductSubServiceListByIDQuery,
  useGetProductSubServiceListQuery,
  useGetServiceListQuery,
  useUpdateManufacturerMutation,
  useUpdateProductMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  name: any;
  product_sub_service_id: any;
  product_sub_service: any;
  service: any;
}

const AddManufacturer = (props: any) => {
  const { setOpen, manufacturerData } = props;
  const methods = useForm<FormValues>();
  const {
    watch,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;
  const [updateManufacturer] = useUpdateManufacturerMutation();
  const [addManufacturer] = useAddManufacturerMutation();
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;
  const { data: productSubServiceListData } = useGetProductSubServiceListQuery(
    {}
  );
  const selectedProductSubService = watch("product_sub_service");
  const newSelectedProductSubService = selectedProductSubService?.value;

  const { data: productSubServiceListByID } =
    useGetProductSubServiceListByIDQuery(
      { service_id: newSelectedService },
      { skip: !newSelectedService }
    );

  const handleCloseModalForAddManufacturer = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: manufacturerData?.id
        ? `manufacturer/${manufacturerData.id}`
        : "manufacturer",
      body: {
        name: data.name,
        product_sub_service_id: newSelectedProductSubService,
      },
    };
    try {
      if (manufacturerData?.id) {
        const resp: any = await updateManufacturer(reqObject).unwrap();
        if (resp.status === 2031) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addManufacturer(reqObject).unwrap();
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

  const productSubServiceOptions = (productSubServiceListByID?.data || []).map(
    (item: any) => ({
      label: item.name || "Unknown",
      value: item.id,
    })
  );

  useEffect(() => {
    if (manufacturerData?.id) {
      const productSubServiceSetValue = productSubServiceListData?.data.find(
        (item: any) => item.id === manufacturerData?.product_sub_service_id?.id
      );
      let productSubServiceObj = {
        label: productSubServiceSetValue?.name,
        value: productSubServiceSetValue?.id,
      };

      const serviceSetValue = serviceList?.data?.find(
        (item: any) => item.id === productSubServiceSetValue?.service_id
      );

      let serviceObj = {
        label: serviceSetValue?.name,
        value: serviceSetValue?.id,
      };

      setValue("name", manufacturerData.name);
      setValue("service", serviceObj);
      setValue("product_sub_service", productSubServiceObj);
    } else {
      reset();
    }
  }, [manufacturerData.id, setValue, reset, serviceList]);

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Box className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {manufacturerData.id ? "Update Manufacturer" : "Add Manufacturer"}
          </h2>
          <IconButton onClick={handleCloseModalForAddManufacturer}>
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
                    name="product_sub_service"
                    options={productSubServiceOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Product Sub Service"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              <Box className="flex flex-col gap-4">
                <RHFTextField
                  name="name"
                  label="Manufacturer Name"
                  rules={{
                    required: "This field is required",
                  }}
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
              {manufacturerData.id ? "Update Manufacturer" : "Add Manufacturer"}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddManufacturer;
