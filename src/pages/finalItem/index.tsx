import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import RHFTextField from "../../components/RHF/RHFTextField";

import {
  useGetBuildingListQuery,
  useGetLocationListQuery,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useLazyGetSubBuildingListQuery,
  useGetItemsListByIDQuery,
  useAddFinalItemMutation,
} from "../../redux/api/api";

import { toast } from "react-toastify";

const FinalItem = () => {
  const methods = useForm();
  const { watch, setValue, reset } = methods;
  const methods_2 = useForm();
  const {
    formState: { isSubmitting: isSubmitting_2 },
    reset: resetForm_2,
  } = methods_2;
  const { data: serviceList } = useGetServiceListQuery({});
  const selectedService = watch("service");
  const newSelectedService = selectedService?.value;
  const { data: subServiceListByID } = useGetSubServiceListByIDQuery(
    { service_id: newSelectedService },
    { skip: !newSelectedService }
  );

  const selectedSubService = watch("sub_service");
  const subServiceID = selectedSubService?.value;
  const itemsById = useGetItemsListByIDQuery(
    { sub_service_id: subServiceID },
    { skip: !subServiceID }
  );

  const { data: locationListData } = useGetLocationListQuery({});
  const { data: buildingList } = useGetBuildingListQuery({});
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [form2Payload, setForm2Payload] = useState<any>(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [addFinalItem] = useAddFinalItemMutation();

  const [renderComp, setRenderComp] = useState({
    location: true,
    building: true,
  });

  const handleRenderCopm = (value: any) => {
    if (value === "BUILDING") {
      setRenderComp({
        location: true,
        building: true,
      });
    }
  };

  const serviceOptions = Array.isArray(serviceList?.data)
    ? serviceList?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const subServiceOptions = Array.isArray(subServiceListByID?.data)
    ? subServiceListByID?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const itemByIdList = Array.isArray(itemsById?.data?.data)
    ? itemsById.data?.data.map((item: any) => {
        return {
          label: item.name || "Unknown",
          value: item.id,
          calculation_type: item.calculation_type,
        };
      })
    : [];

  const locationOptions = Array.isArray(locationListData?.data)
    ? locationListData?.data.map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      }))
    : [];

  const buildingOptions = Array.isArray(buildingList?.data)
    ? buildingList?.data?.map((item: any) => ({
        label: item.type || "Unknown",
        value: item.id,
      }))
    : [];

  const item = watch("item");
  const subServiceCheck = watch("sub_service");
  const serviceCheck = watch("service");
  const buildingCheck = watch("building");

  const onSubmitForm1 = (data: any) => {
    setForm2Payload(data);
    setShowSecondForm(true);
  };

  const onSubmitForm2 = async (data: any) => {
    const payload = {
      url: "final-items",
      body: {
        location_id: form2Payload?.location?.value,
        building_id: form2Payload?.building?.value,
        service_id: form2Payload?.service?.value,
        sub_service_id: form2Payload?.sub_service?.value,
        item_id: form2Payload?.item?.value,
        item_data: data,
      },
    };

    try {
      const resp: any = await addFinalItem(payload).unwrap();
      if (resp.status === 200) {
        toast.success("Item added successfully");
        reset();
        resetForm_2();
        setShowSecondForm(false);
      }
    } catch (error) {
      toast.error("Failed to add item");
    }
  };

  const sections = [
    "Types",
    "Capacities",
    "Item Unit",
    "Measuring Unit",
    "Description",
  ];

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Item Form</h2>
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
                  onInputChange={(event: any, value: any) => {
                    setValue("service", value);
                    setValue("sub_service", null);
                    setValue("item", null);
                    setSelectedBuilding(null);
                  }}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="sub_service"
                  options={subServiceOptions}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Sub Service"
                  rules={{ required: "This field is required" }}
                  onInputChange={(event: any, value: any) => {
                    setValue("sub_service", value);
                    setValue("item", null);
                    handleRenderCopm(null);
                    setValue("building", null);
                    setSelectedBuilding(null);
                  }}
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="item"
                  options={itemByIdList}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Item"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) => {
                    handleRenderCopm(value?.calculation_type);
                    setValue("item", value);
                    setValue("location", null);
                  }}
                />
              </FormControl>
            </Box>
            {item && (
              <Box className="flex gap-4 mb-4 flex-wrap">
                {renderComp.location && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="location"
                      options={locationOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Location"
                      rules={{ required: "This field is required" }}
                    />
                  </FormControl>
                )}

                {renderComp.building && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="building"
                      value={selectedBuilding || null}
                      options={buildingOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Building"
                      rules={{ required: "This field is required" }}
                      onChange={(event: any, value: any) => {
                        setSelectedBuilding(value || null);
                        if (value?.value) setValue("building", value);
                      }}
                    />
                  </FormControl>
                )}
              </Box>
            )}
            <Box className="flex justify-start py-4">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="w-[20.5rem] h-12"
                disabled={!(serviceCheck?.value && subServiceCheck?.value)}
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
              <Box className="grid grid-cols-4 gap-4 mb-4">
                <RHFTextField
                  name="Types"
                  type="number"
                  label="Types"
                  rules={{ required: "This field is required" }}
                />
                <RHFTextField
                  name="Capacity"
                  type="number"
                  label="Capacity"
                  rules={{ required: "This field is required" }}
                />
                <RHFTextField
                  name="Item Unit"
                  type="number"
                  label="Item Unit"
                  rules={{ required: "This field is required" }}
                />
                <RHFTextField
                  name="Measuring Unit"
                  type="number"
                  label="Measuring Unit"
                  rules={{ required: "This field is required" }}
                />
              </Box>
              <Box className="mb-4 my-4">
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
              </Box>
            </form>
          </FormProvider>
        )}
      </Box>
    </>
  );
};

export default FinalItem;
