import { Box, Button, FormControl } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { useState } from "react";
import {
  useAddFinalDesignsMutation,
  useGetActionsListByIDQuery,
  useGetBuildingListQuery,
  useGetLocationListQuery,
  useGetServiceListQuery,
  useGetSubServiceListByIDQuery,
  useLazyGetLevelsListQuery,
  useLazyGetRoomsListQuery,
  useLazyGetSubBuildingListQuery,
} from "../../redux/api/api";

import VentilationElevated from "./ventilation/VentilationElevated";
import VentilationDepot from "./ventilation/VentilationDepot";
import VentilationUnderground from "./ventilation/VentilationUnderground";
import DailuxElevated from "./dailux/DailuxElevatedStation";
import DailuxUnderground from "./dailux/DailuxUndergroundStation";
import DailuxDepot from "./dailux/DailuxDepotStation";
import { toast } from "react-toastify";
import CableElevated from "./cableSizing/CableElevated";
import CableUnderground from "./cableSizing/CableUnderground";
import CableDepot from "./cableSizing/CableDepot";
import HeatLoadElevated from "./heatLoad/HeatLoadElevated";
import HeatLoadUnderground from "./heatLoad/HeatLoadUnderground";
import HeatLoadDepot from "./heatLoad/HeatLoadDepot";
import ElectricalPanelElevated from "./equipmentLoad/ElectricalPanelElevated";
import ElectricalPanelUnderground from "./equipmentLoad/ElectricalPanelUnderground";
import ElectricalPanelDepot from "./equipmentLoad/ElectricalPanelDepot";

const FinalDesign = () => {
  const methods = useForm();
  const {
    watch,
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;
  const methods_2 = useForm();
  const {
    watch: form_2,
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
  const actionsById = useGetActionsListByIDQuery(
    { sub_service_id: subServiceID },
    { skip: !subServiceID }
  );

  const { data: locationListData } = useGetLocationListQuery({});
  const { data: buildingList } = useGetBuildingListQuery({});
  const [fetchSubBuildings, { data: subBuildingListData }] =
    useLazyGetSubBuildingListQuery();
  const [fetchLevels, { data: levelsListData }] = useLazyGetLevelsListQuery();
  const [fetchRooms, { data: roomListData }] = useLazyGetRoomsListQuery();
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  const [selectedSubBuilding, setSelectedSubBuilding] = useState<any>(null);
  const [selectedLevel, setSelectedLevel] = useState<any>(null);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [form2Payload, setForm2Payload] = useState<any>(null);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [addFinalDesigns] = useAddFinalDesignsMutation();

  const [renderComp, setRenderComp] = useState({
    loaction: false,
    building: false,
    sub_building: false,
    level: false,
    room: false,
  });

  const handleRenderCopm = (value: string) => {
    if (value === "BUILDING") {
      setRenderComp({
        loaction: true,
        building: true,
        sub_building: false,
        level: false,
        room: false,
      });
    } else if (value === "SUB_BUILDING") {
      setRenderComp({
        loaction: true,
        building: true,
        sub_building: true,
        level: false,
        room: false,
      });
    } else if (value === "LEVEL") {
      setRenderComp({
        loaction: true,
        building: true,
        sub_building: true,
        level: true,
        room: false,
      });
    } else if (value === "ROOM") {
      setRenderComp({
        loaction: true,
        building: true,
        sub_building: true,
        level: true,
        room: true,
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

  const actionByIdList = Array.isArray(actionsById?.data?.data)
    ? actionsById.data?.data.map((item: any) => {
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

  // Options for dropdowns
  const buildingOptions = Array.isArray(buildingList?.data)
    ? buildingList?.data?.map((item: any) => ({
        label: item.type || "Unknown",
        value: item.id,
      }))
    : [];

  const subBuildingOptions = Array.isArray(subBuildingListData?.data)
    ? subBuildingListData?.data
        ?.filter((item: any) => item.building_id === selectedBuilding?.value)
        .map((item: any) => ({
          label: item.type || "Unknown",
          value: item.id,
        }))
    : [];

  const levelsOptions =
    levelsListData?.data
      ?.filter(
        (item: any) => item.sub_building_id === selectedSubBuilding?.value
      )
      .map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      })) || [];

  const roomOptions =
    roomListData?.data
      ?.filter((item: any) => item.level_id === selectedLevel?.value)
      .map((item: any) => ({
        label: item.name || "Unknown",
        value: item.id,
      })) || [];

  const action = watch("action");
  const subServiceCheck = watch("sub_service");
  const buildingCheck = watch("building");

  const onSubmitForm1 = (data: any) => {
    setForm2Payload(data);
    setShowSecondForm(true);
  };

  const onSubmitForm2 = async (data: any) => {
    const payload = {
      url: "final-designs",
      body: {
        service_id: form2Payload?.service?.value,
        sub_service_id: form2Payload?.sub_service?.value,
        action_id: form2Payload?.action?.value,
        location_id: form2Payload?.location?.value,
        building_id: form2Payload?.building?.value,
        ...(selectedSubBuilding?.value && {
          sub_building_id: selectedSubBuilding?.value,
        }),
        ...(selectedLevel?.value && { level_id: selectedLevel?.value }),
        ...(selectedRoom?.value && { room_id: selectedRoom?.value }),
        calculation_type: form2Payload?.action?.calculation_type,
        action_data: data,
      },
    };
    try {
      const resp: any = await addFinalDesigns(payload).unwrap();
      if (resp.status === 3031) {
        toast.success(resp.message);
      }
      reset();
      resetForm_2();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Box className="mb-4">
        <h2 className="text-2xl font-bold">Final Design Form</h2>
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
                />
              </FormControl>

              <FormControl className="w-1/4">
                <RHFAutocomplete
                  name="action"
                  options={actionByIdList}
                  getOptionLabel={(option) => option?.label || ""}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option?.value === value?.value
                  }
                  label="Action"
                  rules={{ required: "This field is required" }}
                  onChange={(event: any, value: any) => {
                    handleRenderCopm(value?.calculation_type);
                    setValue("action", value);
                  }}
                />
              </FormControl>
            </Box>

            {action && (
              <Box className="flex gap-4 mb-4 flex-wrap">
                {renderComp.loaction && (
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
                        setSelectedSubBuilding(null);
                        setSelectedLevel(null);
                        setSelectedRoom(null);
                        if (value?.value) {
                          fetchSubBuildings({ building_id: value.value });
                        }
                        setValue("building", value);
                      }}
                    />
                  </FormControl>
                )}

                {renderComp.sub_building && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="sub_building"
                      value={selectedSubBuilding || null}
                      options={subBuildingOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Sub Building"
                      rules={{ required: "This field is required" }}
                      onChange={(event: any, value: any) => {
                        setSelectedSubBuilding(value || null);
                        setSelectedLevel(null);
                        setSelectedRoom(null);
                        if (value?.value) {
                          fetchLevels({ sub_building_id: value.value });
                        }
                        setValue("sub_building", value);
                      }}
                    />
                  </FormControl>
                )}

                {renderComp.level && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="levels"
                      value={selectedLevel || null}
                      options={levelsOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Levels"
                      rules={{ required: "This field is required" }}
                      onChange={(event: any, value: any) => {
                        setSelectedLevel(value || null);
                        setSelectedRoom(null);
                        if (value?.value) {
                          fetchRooms({ level_id: value.value });
                        }
                        setValue("levels", value);
                      }}
                    />
                  </FormControl>
                )}

                {renderComp.room && (
                  <FormControl className="w-1/4">
                    <RHFAutocomplete
                      name="rooms"
                      value={selectedRoom || null}
                      options={roomOptions}
                      getOptionLabel={(option) => option?.label || ""}
                      isOptionEqualToValue={(option: any, value: any) =>
                        option?.value === value?.value
                      }
                      label="Rooms"
                      rules={{ required: "This field is required" }}
                      onChange={(event: any, value: any) => {
                        setSelectedRoom(value || null);
                        setValue("rooms", value);
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
                disabled={isSubmitting ? true : false}
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
              <Box className="mb-4 my-4">
                {subServiceCheck?.label === "Lighting" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <DailuxElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <DailuxUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <DailuxDepot />}
                  </>
                )}
                {subServiceCheck?.label === "Ventilation" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <VentilationElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <VentilationUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <VentilationDepot />}
                  </>
                )}

                {subServiceCheck?.label === "Containment" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <CableElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <CableUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <CableDepot />}
                  </>
                )}

                {subServiceCheck?.label === "Chilled Water System" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <HeatLoadElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <HeatLoadUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && <HeatLoadDepot />}
                  </>
                )}

                {subServiceCheck?.label === "Chilled Water System" && (
                  <>
                    {buildingCheck?.label === "Elevated Metro Station" && (
                      <ElectricalPanelElevated />
                    )}
                    {buildingCheck?.label === "Underground Metro Station" && (
                      <ElectricalPanelUnderground />
                    )}
                    {buildingCheck?.label === "Depot" && (
                      <ElectricalPanelDepot />
                    )}
                  </>
                )}
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

export default FinalDesign;
