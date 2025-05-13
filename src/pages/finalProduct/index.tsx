import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import {
  useAddFinalProductMutation,
  useGetServiceListQuery,
  useGetProductSubServiceListQuery,
  useGetProductListQuery,
  useGetManufacturerListQuery,
  useGetProductSubServiceListByIDQuery,
  useGetProductListByIDQuery,
} from "../../redux/api/api";

import { toast } from "react-toastify";
import RHFTextField from "../../components/RHF/RHFTextField";
import Lighting from "./electrical/Lighting";
import Power from "./electrical/Power";
import Cables from "./electrical/Cables";
import Panels from "./electrical/Panles";
import UPS from "./electrical/UPS";
import DB from "./electrical/DB";
import DG from "./electrical/DG";
import Fans from "./hvac/Fans";
import Chiller from "./hvac/Chiller";
import AHU from "./hvac/AHU";
import ODU from "./hvac/ODU";
import IDU from "./hvac/IDU";
import Pumps from "./fireFighting/Pumps";
import Hydrant from "./fireFighting/Hydrant";
import Sprinkler from "./fireFighting/Sprinkler";
import FireExtinguisher from "./fireFighting/FireExtinguisher";
import Drainage from "./plumbing/Drainage";
import WaterSupply from "./plumbing/WaterSupply";

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

  const { data: productSubServices } = useGetProductSubServiceListByIDQuery(
    { service_id: serviceId },
    { skip: !serviceId }
  );

  const selectedProductSubService = watch("product_sub_service");
  const productSubServiceId = selectedProductSubService?.value;

  const { data: products } = useGetProductListByIDQuery(
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
  const [addFinalProduct] = useAddFinalProductMutation();

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

    try {
      const resp: any = await addFinalProduct(payload).unwrap();
      if (resp.status === 200) {
        toast.success("Product added successfully");
        reset();
        resetForm_2();
        setShowSecondForm(false);
      }
    } catch (error) {
      toast.error("Failed to add product");
    }
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
      return <Lighting />;
    } else if (productSubService === "Power") {
      return <Power />;
    } else if (productSubService === "Cables") {
      return <Cables />;
    } else if (productSubService === "Panels") {
      return <Panels />;
    } else if (productSubService === "UPS") {
      return <UPS />;
    } else if (productSubService === "DG") {
      return <DG />;
    } else if (productSubService === "DB") {
      return <DB />;
    } else if (productSubService === "Fans") {
      return <Fans />;
    } else if (productSubService === "Chiller") {
      return <Chiller />;
    } else if (productSubService === "AHU") {
      return <AHU />;
    } else if (productSubService === "ODU") {
      return <ODU />;
    } else if (productSubService === "IDU") {
      return <IDU />;
    } else if (productSubService === "Pumps") {
      return <Pumps />;
    } else if (productSubService === "Hydrant") {
      return <Hydrant />;
    } else if (productSubService === "Sprinkler") {
      return <Sprinkler />;
    } else if (productSubService === "FireExtinguisher") {
      return <FireExtinguisher />;
    } else if (productSubService === "WaterSupply") {
      return <WaterSupply />;
    } else if (productSubService === "Drainage") {
      return <Drainage />;
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
                  disabled={isSubmitting_2 ? true : false}
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
