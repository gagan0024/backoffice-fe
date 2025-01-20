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
import { useEffect, useState } from "react";
import {
  useAddProductMutation,
  useGetCategoryListQuery,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useGetSubServiceListQuery,
  useUpdateProductMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";

interface FormValues {
  name: any;
  type: any;
  capacity: number;
  vendors: any;
  sub_service: any;
  service: any;
  factors: any;
  unit: number;
  product_category: any;
}

const AddProduct = (props: any) => {
  const { setOpen, productData, setProductData } = props;
  const methods = useForm<FormValues>();
  const {
    setValue,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;
  const [productTypeArray, setProductTypeArray] = useState<any[]>([]);
  const [vendorArray, setVendorArray] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any>("");
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();
  const { data: serviceList } = useGetServiceListQuery({});
  const { data: subServiceListData } = useGetSubServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;
  const { data: subServiceListByID } = useGetSubServiceListByIDQuery(
    { service_id: newSelectedService },
    { skip: !newSelectedService }
  );

  const selectedSubService = watch("sub_service");
  const newSelectedSubService = selectedSubService?.value;

  const { data: categoryData } = useGetCategoryListQuery({});
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleProductTypeChange = (event: any, newValue: any[]) => {
    setProductTypeArray(newValue);
    setValue("type", newValue);
  };

  const handleVendorChange = (event: any, newValue: any[]) => {
    setVendorArray(newValue);
    setValue("vendors", newValue);
  };

  const handleCloseModalForAddProduct = () => {
    setOpen(false);
    setProductData(null);
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

  const categoryDataOptions = (categoryData?.data || []).map((item: any) => ({
    label: item.name || "Unknown",
    value: item.id,
    factors: item.factors || [],
  }));

  const handleCategoryChange = (event: any, value: any) => {
    setSelectedCategory(value);
    setCategoryId(value?.value);
    // @ts-ignore
    setValue("product_category", value);
  };

  const handleData = (data: any) => {
    const newArray: any = [];
    const keys = Object.keys(data);
    for (const item of keys) {
      newArray.push({ [item]: data[item] });
    }
    return newArray;
  };

  const onSubmit = async (data: FormValues) => {
    const array = handleData(data.factors);
    const reqObject = {
      url: productData?.id ? `products/${productData?.id}` : "products",
      body: {
        name: data.name,
        capacity: data.capacity,
        type: productTypeArray,
        vendors: vendorArray,
        sub_service_id: newSelectedSubService,
        category_id: categoryId,
        factors: array,
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

  useEffect(() => {
    if (productData) {
      const subServiceSetValue = subServiceListData?.data.find(
        (item: any) => item.id === productData.sub_service_id?.id
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

      let categoryValue = categoryData?.data?.find(
        (item: any) => item.id === productData?.category_id
      );

      let categoryObj = {
        label: categoryValue?.name,
        value: categoryValue?.id,
        factors: categoryValue?.factors || [],
      };

      for (let i = 0; i < productData?.factors?.length; i++) {
        setValue(
          `factors.${Object.keys(productData?.factors[i])[0]}`,
          productData?.factors[i][Object.keys(productData?.factors[i])[0]]
        );
      }
      setValue("service", serviceObj);
      setValue("sub_service", subServiceObj);
      setValue("capacity", productData.capacity);
      setValue("name", productData.name);
      setValue("vendors", productData.vendors || []);
      setValue("type", productData.type);
      setValue("product_category", categoryObj);
      setSelectedCategory(categoryObj);
    }
  }, [productData, subServiceListData, serviceList, categoryData]);

  return (
    <>
      <Box className="flex flex-col gap-8">
        <Box className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {productData?.id ? "Update Product" : "Add Product"}
          </h2>
          <IconButton onClick={handleCloseModalForAddProduct}>
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
                type="number"
              />
              <RHFTextField
                name="unit"
                label="Unit"
                rules={{
                  required: "This field is required",
                }}
                type="number"
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

            <FormControl>
              <RHFAutocomplete
                name="product_category"
                options={categoryDataOptions}
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option: any, value: any) =>
                  option?.value === value?.value
                }
                label="Product Category"
                rules={{ required: "This field is required" }}
                onChange={handleCategoryChange}
                value={selectedCategory}
              />
            </FormControl>

            <Box className="grid grid-cols-2 gap-4 items-center mt-4">
              {selectedCategory?.factors?.map((factor: any, index: any) => {
                return (
                  <RHFTextField
                    key={index}
                    name={`factors.${factor
                      .replace(/ *\([^)]*\) */g, "")
                      .split("/")[0]
                      .replace(/\s+/g, "_")
                      .toLowerCase()}`}
                    label={factor}
                    type="text"
                    rules={
                      {
                        // required: "This field is required",
                      }
                    }
                  />
                );
              })}
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              {productData?.id ? "Update Product" : "Add Product"}
            </Button>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddProduct;
