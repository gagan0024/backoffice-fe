import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import {
  // useAddFinalProductsMutation,
  useGetServiceListQuery,
  useGetProductSubServiceListQuery,
  useGetProductListQuery,
  useGetManufacturerListQuery,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import RHFTextField from "../../components/RHF/RHFTextField";

const FinalProduct = () => {
  const methods = useForm();
  const { watch, setValue, reset } = methods;
  const methods_2 = useForm();
  const {
    formState: { isSubmitting: isSubmitting_2 },
    reset: resetForm_2,
  } = methods_2;

  // API Calls
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const serviceId = selectedService?.value;

  const { data: productSubServices } = useGetProductSubServiceListQuery(
    { service_id: serviceId },
    { skip: !serviceId }
  );

  const selectedProductSubService = watch("product_sub_service");
  const productSubServiceId = selectedProductSubService?.value;

  const { data: products } = useGetProductListQuery(
    { product_sub_service_id: productSubServiceId },
    { skip: !productSubServiceId }
  );

  const selectedProduct = watch("product");
  const productId = selectedProduct?.value;

  const { data: manufacturers } = useGetManufacturerListQuery(
    { product_id: productId },
    { skip: !productId }
  );

  const [form2Payload, setForm2Payload] = useState<any>(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  // const [addFinalProduct] = useAddFinalProductsMutation();

  // Options for dropdowns
  const serviceOptions =
    serviceList?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const productSubServiceOptions =
    productSubServices?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const productOptions =
    products?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const manufacturerOptions =
    manufacturers?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const onSubmitForm1 = (data: any) => {
    setForm2Payload(data);
    setShowSecondForm(true);
  };

  const onSubmitForm2 = async (data: any) => {
    const payload = {
      url: "final-products",
      body: {
        service_id: form2Payload?.service?.value,
        product_sub_service_id: form2Payload?.product_sub_service?.value,
        product_id: form2Payload?.product?.value,
        manufacturer_id: form2Payload?.manufacturer?.value,
        product_data: data,
      },
    };

    // try {
    //   const resp: any = await addFinalProduct(payload).unwrap();
    //   if (resp.status === 200) {
    //     toast.success("Product added successfully");
    //     reset();
    //     resetForm_2();
    //     setShowSecondForm(false);
    //   }
    // } catch (error) {
    //   toast.error("Failed to add product");
    // }
  };

  // Reset dependent fields when parent field changes
  const handleServiceChange = (value: any) => {
    setValue("service", value);
    setValue("product_sub_service", null);
    setValue("product", null);
    setValue("manufacturer", null);
  };

  const handleProductSubServiceChange = (value: any) => {
    setValue("product_sub_service", value);
    setValue("product", null);
    setValue("manufacturer", null);
  };

  const handleProductChange = (value: any) => {
    setValue("product", value);
    setValue("manufacturer", null);
  };

  // Render appropriate form fields based on product subservice
  const renderProductFields = () => {
    const productSubService = watch("product_sub_service")?.label;
    const product = watch("product")?.label;

    if (productSubService === "Lighting") {
      return (
        <>
          <FormControl className="w-1/4">
            <RHFTextField
              name="model_number"
              label="Model Number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="voltage"
              label="Voltage (V)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="wattage"
              label="Wattage (W)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="lamp_type"
              label="Lamp Type"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="ip_rating_afo"
              label="IP Rating (AFO)"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="ip_rating_mos"
              label="IP Rating (MOS)"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="ik_rating"
              label="IK Rating"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="cri"
              label="Color Rendering Index (CRI)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="lumens_per_watt"
              label="Lumens per Watt"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="lamp_lifetime"
              label="Lamp Lifetime (Hours)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="compliance_standards"
              label="Compliance with Standards"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="price"
              label="Price (₹)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
        </>
      );
    } else if (productSubService === "Power") {
      return (
        <>
          <FormControl className="w-1/4">
            <RHFTextField
              name="model_number"
              label="Model Number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="voltage_rating"
              label="Voltage Rating (V)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="current_rating"
              label="Current Rating (A)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="frequency"
              label="Frequency (Hz)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="power_factor"
              label="Power Factor"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="efficiency"
              label="Efficiency (%)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="protection_rating"
              label="Protection Rating (IP)"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="temperature_range"
              label="Temperature Range (°C)"
              rules={{ required: true }}
            />
          </FormControl>
          <FormControl className="w-1/4">
            <RHFTextField
              name="price"
              label="Price (₹)"
              type="number"
              rules={{ required: true }}
            />
          </FormControl>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Product Form</h2>
      </Box>

      <Box className="h-[70vh] overflow-y-scroll py-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmitForm1)}>
            <Box className="flex gap-4 mb-4 flex-wrap">
              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="service"
                  options={serviceOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Service"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) =>
                    handleServiceChange(value)
                  }
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="product_sub_service"
                  options={productSubServiceOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Product Sub Service"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) =>
                    handleProductSubServiceChange(value)
                  }
                  disabled={!watch("service")}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="product"
                  options={productOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Product"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) =>
                    handleProductChange(value)
                  }
                  disabled={!watch("product_sub_service")}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="manufacturer"
                  options={manufacturerOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Manufacturer"
                  rules={{ required: "This field is required" }}
                  disabled={!watch("product")}
                />
              </FormControl>
            </Box>

            <Box className="flex justify-start py-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="w-[20.5rem] h-12"
                disabled={!watch("manufacturer")}
              >
                Next
              </Button>
            </Box>
          </form>
        </FormProvider>

        {showSecondForm && (
          <FormProvider {...methods_2}>
            <form
              className="py-2"
              onSubmit={methods_2.handleSubmit(onSubmitForm2)}
            >
              <Box className="flex gap-4 mb-4 flex-wrap">
                {renderProductFields()}
              </Box>

              <Box className="flex justify-start py-4">
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  className="w-[20.5rem] h-12"
                  disabled={isSubmitting_2}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </FormProvider>
        )}
      </Box>
    </>
  );
};

export default FinalProduct;
