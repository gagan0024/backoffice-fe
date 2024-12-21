import { Box, Button, FormControl, IconButton } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import { toast } from "react-toastify";
import {
  useAddLevelsMutation,
  useGetBuildingListQuery,
  useGetSubBuildingListQuery,
  useUpdateLevelsMutation,
} from "../../redux/api/api";
import { useEffect, useState } from "react";

interface FormValues {
  sub_building_id: any;
  name: string;
  description: string;
  building_id: any;
}

const AddLevels = (props: any) => {
  const { setOpen, updatelevelsObj } = props;
  const methods = useForm<FormValues>();
  const { reset, handleSubmit, setValue, watch } = methods;
  const [addLevels] = useAddLevelsMutation();
  const [updateLevels] = useUpdateLevelsMutation();
  const { data: buildingList } = useGetBuildingListQuery({});
  const [subBuildingObj, setSubBuildingObj] = useState<any>(null);
  const { data: subBuildingList }: any = useGetSubBuildingListQuery({});
  const buildingID = watch("building_id");

  useEffect(() => {
    if (subBuildingList?.data?.length) {
      let tempObj: any = {};
      for (let i = 0; i < subBuildingList?.data?.length; i++) {
        let subBuilding = subBuildingList.data[i];
        let newObj = {
          label: subBuilding.type,
          value: subBuilding.id,
          key: i,
        };
        tempObj[subBuilding.building_id] = tempObj[subBuilding.building_id]
          ?.length
          ? [...tempObj[subBuilding.building_id], newObj]
          : [newObj];
      }
      setSubBuildingObj(tempObj);
    }
  }, [subBuildingList]);

  const onSubmit = async (data: FormValues) => {
    const reqObject = {
      url: updatelevelsObj?.id ? `levels/${updatelevelsObj.id}` : "levels",
      body: {
        sub_building_id: data.sub_building_id.value,
        name: data.name,
        description: data.description,
      },
    };
    try {
      if (updatelevelsObj?.id) {
        const resp: any = await updateLevels(reqObject).unwrap();
        if (resp.status === 2024) {
          toast.success(resp.message);
        }
      } else {
        const resp: any = await addLevels(reqObject).unwrap();
        if (resp.status === 2021) {
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
    if (updatelevelsObj?.id) {
      let currentSubBuilding = subBuildingList?.data?.find(
        (item: any) => item.id === updatelevelsObj.sub_building_id
      );
      let subBuildingObj = {
        label: currentSubBuilding?.type,
        value: currentSubBuilding?.id,
      };

      let currentBuilding = buildingList?.data?.find(
        (item: any) => item.id === currentSubBuilding?.building_id
      );
      let buildingObj = {
        label: currentBuilding?.type,
        value: currentBuilding?.id,
      };

      setValue("name", updatelevelsObj.name);
      setValue("building_id", buildingObj);
      setValue("description", updatelevelsObj.description);
      setValue("sub_building_id", subBuildingObj);
    } else {
      reset();
    }
  }, [updatelevelsObj.id, buildingList, subBuildingList]);

  const handleCloseModalForAddBuildings = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="w-full bg-white">
        <Box className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">
            {updatelevelsObj.id ? "Update Level" : "Add Level"}
          </h2>
          <IconButton onClick={handleCloseModalForAddBuildings}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form
            className="flex gap-4 flex-col w-full justify-between h-[75vh]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box className="flex flex-col gap-4">
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="building_id"
                    options={
                      buildingList?.data?.map((item: any, index: number) => ({
                        label: item.type || "Unknown",
                        value: item.id,
                        key: index,
                      })) || []
                    }
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Building"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="sub_building_id"
                    options={
                      buildingID &&
                      subBuildingObj &&
                      subBuildingObj[buildingID?.value]
                        ? subBuildingObj[buildingID?.value]
                        : []
                    }
                    getOptionLabel={(option) => option?.label || ""}
                    isOptionEqualToValue={(option: any, value: any) =>
                      option?.value === value?.value
                    }
                    label="Sub Building"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <RHFTextField
                    name="name"
                    label="Levels"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>
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
            <Box>
              <Button type="submit" size="large" variant="contained" fullWidth>
                {updatelevelsObj.id ? "Update Level" : "Add Level"}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddLevels;
