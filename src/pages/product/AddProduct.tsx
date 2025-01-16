import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormProvider, useForm, Controller } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import { useState } from "react";
import {
  useAddProductMutation,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useUpdateProductMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";

interface FormValues {
  name: any;
  type: any;
  capacity: string;
  vendors: any;
  sub_service_id: any;
  service: any;
  factors: any;
}

const AddProduct = (props: any) => {
  const { setOpen, productData } = props;
  const methods = useForm<FormValues>();
  const {
    setValue,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;
  const [productTypeArray, setProductTypeArray] = useState<string[]>([]);
  const [vendorArray, setVendorArray] = useState<string[]>([]);
  const [factorsArray, setFactorsArray] = useState<string[]>([]);
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;

  const { data: subServiceListByID } = useGetSubServiceListByIDQuery(
    { service_id: newSelectedService },
    { skip: !newSelectedService }
  );

  const handleProductTypeChange = (event: any, newValue: string[]) => {
    setProductTypeArray(newValue);
    setValue("type", newValue);
    console.log(event);
  };

  const handleVendorChange = (event: any, newValue: string[]) => {
    setVendorArray(newValue);
    setValue("vendors", newValue);
    console.log(event);
  };

  const handleFactorsChange = (event: any, newValue: string[]) => {
    setFactorsArray(newValue);
    setValue("factors", newValue);
    console.log(event);
  };

  const handleCloseModalForAddLocation = () => {
    setOpen(false);
  };

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: productData?.id ? `products/${productData.id}` : "products",
      body: {
        name: data.name,
        capacity: data.capacity,
        type: productTypeArray,
        vendors: vendorArray,
        sub_service_id: newSelectedService,
        factors: factorsArray,
      },
    };
    try {
      if (productData?.id) {
        const resp: any = await updateProduct(reqObject).unwrap();
        if (resp.status === 2031) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addProduct(reqObject).unwrap();
        if (resp.status === 2031) {
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

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Box className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {productData ? "Update Product" : "Add Product"}
          </h2>
          <IconButton onClick={handleCloseModalForAddLocation}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
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
                label="Product Name"
                rules={{
                  required: "This field is required",
                }}
              />

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={[]}
                    value={productTypeArray}
                    onChange={handleProductTypeChange}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <RHFTextField
                        {...params}
                        name="type"
                        label="Product Type"
                        rules={{
                          required: "This field is required",
                        }}
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box className="flex gap-4 items-center">
              <RHFTextField
                name="capacity"
                label="Capacity"
                rules={{
                  required: "This field is required",
                }}
              />
              <RHFTextField
                name="unit"
                label="Unit"
                rules={{
                  required: "This field is required",
                }}
              />
            </Box>

            <Box>
              <Controller
                name="vendors"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={[]}
                    value={vendorArray}
                    onChange={handleVendorChange}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <RHFTextField
                        {...params}
                        name="vendors"
                        label="Vendor"
                        rules={{
                          required: "This field is required",
                        }}
                      />
                    )}
                  />
                )}
              />
            </Box>

            <Box>
              <Controller
                name="factors"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    multiple
                    options={[]}
                    value={factorsArray}
                    onChange={handleFactorsChange}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          variant="outlined"
                          label={option}
                          {...getTagProps({ index })}
                        />
                      ))
                    }
                    renderInput={(params) => (
                      <RHFTextField
                        {...params}
                        name="factors"
                        label="Factors"
                        rules={{
                          required: "This field is required",
                        }}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              {productData ? "Update Product" : "Add Product"}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddProduct;
