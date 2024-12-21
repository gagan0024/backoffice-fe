import { Box, Button, FormControl, IconButton } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import {
  useAddRoomsMutation,
  useGetBuildingListQuery,
  useGetLevelsListByIDQuery,
  useGetLevelsListQuery,
  useGetSubBuildingListByIDQuery,
  useGetSubBuildingListQuery,
  useUpdateRoomsMutation,
} from "../../redux/api/api";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface FormValues {
  sub_building: any;
  room: string;
  description: string;
  levels: any;
  building: any;
}

const AddRooms = (props: any) => {
  const { setOpen, RoomData } = props;
  const methods = useForm<FormValues>();
  const { reset, handleSubmit, setValue, watch } = methods;
  const { data: buildingList } = useGetBuildingListQuery({});
  const [addRooms] = useAddRoomsMutation();
  const [updateRooms] = useUpdateRoomsMutation();
  const selectedBuilding = watch("building");
  const newSelectedBuilding = selectedBuilding?.value;
  const selectedSubBuilding = watch("sub_building");
  const newSelectedSubBuilding = selectedSubBuilding?.value;
  const { data: subBuildingList } = useGetSubBuildingListByIDQuery(
    { building_id: newSelectedBuilding },
    {
      skip: !newSelectedBuilding,
    }
  );

  const { data: levelListData } = useGetLevelsListByIDQuery(
    {
      sub_building_id: newSelectedSubBuilding,
    },
    {
      skip: !newSelectedSubBuilding,
    }
  );
  const { data: alllevelListData } = useGetLevelsListQuery(
    {},
    {
      skip: !Object.keys(RoomData).length,
    }
  );
  const { data: allSubBuildingListData } = useGetSubBuildingListQuery(
    {},
    {
      skip: !Object.keys(RoomData).length,
    }
  );

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: RoomData?.id ? `rooms/${RoomData.id}` : "rooms",
      body: {
        level_id: data.levels.value,
        name: data.room,
        description: data.description,
      },
    };
    try {
      if (RoomData?.id) {
        const resp: any = await updateRooms(reqObject).unwrap();
        if (resp.status === 2031) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addRooms(reqObject).unwrap();
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
    if (RoomData?.id) {
      setValue("room", RoomData.name);
      setValue("description", RoomData.description);
      const labelObj = alllevelListData?.data?.find(
        (item: any) => item.id === RoomData.level_id
      );
      const subBuildingObj = allSubBuildingListData?.data?.find(
        (item: any) => item.id === labelObj?.sub_building_id
      );
      const buildingObj = buildingList?.data?.find(
        (item: any) => item.id === subBuildingObj?.building_id
      );

      const newLevel = {
        label: labelObj?.name,
        value: labelObj?.id,
      };
      const newSubBuilding = {
        label: subBuildingObj?.type,
        value: subBuildingObj?.id,
      };
      const newBuilding = {
        label: buildingObj?.type,
        value: buildingObj?.id,
      };

      setValue("levels", newLevel);
      setValue("sub_building", newSubBuilding);
      setValue("building", newBuilding);
    } else {
      reset();
    }
  }, [
    RoomData,
    setValue,
    reset,
    alllevelListData,
    allSubBuildingListData,
    buildingList,
  ]);

  const buildingOptions = (buildingList?.data || []).map((item: any) => ({
    label: item.type || "Unknown",
    value: item.id,
  }));

  const subBuildingOptions = (subBuildingList?.data || []).map((item: any) => ({
    label: item.type || "Unknown",
    value: item.id,
  }));

  const levelsOptions = (levelListData?.data || []).map((item: any) => ({
    label: item.name || "Unknown",
    value: item.id,
  }));

  const handleCloseModalForAddRooms = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="w-full bg-white">
        <Box className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {RoomData?.id ? "Update Room" : "Add Room"}
          </h2>
          <IconButton onClick={handleCloseModalForAddRooms}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form
            className="flex gap-4 flex-col w-full justify-between h-[75vh]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box className="flex flex-col gap-4">
              {/* Building Autocomplete */}
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="building"
                    options={buildingOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Building"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              {/* Sub Building Autocomplete */}
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="sub_building"
                    options={subBuildingOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Sub Building"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              {/* Level Autocomplete */}
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="levels"
                    options={levelsOptions}
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Level"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              {/* Room Input */}
              <Box>
                <FormControl fullWidth>
                  <RHFTextField
                    name="room"
                    label="Room"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>

              {/* Description Input */}
              <Box>
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  rules={{
                    required: "This field is required",
                  }}
                />
              </Box>
            </Box>

            {/* Submit Button */}
            <Box>
              <Button type="submit" size="large" variant="contained" fullWidth>
                {RoomData?.id ? "Update Room" : "Add Room"}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddRooms;
