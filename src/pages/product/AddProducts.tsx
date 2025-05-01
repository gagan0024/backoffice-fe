import { Box, Button, FormControl, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import {
  useAddProductMutation,
  useGetProductSubServiceListByIDQuery,
  useGetProductSubServiceListQuery,
  useGetServiceListQuery,
  useUpdateProductMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  name: any;
  capacity: number;
  product_sub_service_id: any;
  product_sub_service: any;
  service: any;
}

const AddProducts = (props: any) => {
  const { setOpen, productsData } = props;
  const methods = useForm<FormValues>();
  const {
    watch,
    reset,
    formState: { isSubmitting },
    setValue,
  } = methods;
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();
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

  const handleCloseModalForAddProduct = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: productsData?.id ? `products/${productsData.id}` : "products",
      body: {
        name: data.name,
        capacity: data.capacity,
        product_sub_service_id: newSelectedProductSubService,
      },
    };
    try {
      if (productsData?.id) {
        const resp: any = await updateProduct(reqObject).unwrap();
        if (resp.status === 2031) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addProduct(reqObject).unwrap();
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
    if (productsData?.id) {
      const productSubServiceSetValue = productSubServiceListData?.data.find(
        (item: any) => item.id === productsData?.product_sub_service_id?.id
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

      setValue("name", productsData.name);
      setValue("capacity", productsData.capacity);
      setValue("service", serviceObj);
      setValue("product_sub_service", productSubServiceObj);
    } else {
      reset();
    }
  }, [productsData.id, setValue, reset, serviceList]);

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Box className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {productsData.id ? "Update Product" : "Add Product"}
          </h2>
          <IconButton onClick={handleCloseModalForAddProduct}>
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
                  label="Product Name"
                  rules={{
                    required: "This field is required",
                  }}
                />
              </Box>

              <Box className="flex gap-4 items-center">
                <RHFTextField
                  name="capacity"
                  label="Capacity"
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
              {productsData.id ? "Update Product" : "Add Product"}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddProducts;
