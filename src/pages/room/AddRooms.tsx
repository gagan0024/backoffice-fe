import { Box, Button, FormControl, IconButton } from "@mui/material";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import {
  useGetBuildingListQuery,
  useGetSubBuildingListQuery,
} from "../../redux/api/api";

const AddRooms = (props: any) => {
  const { setOpen } = props;
  const methods = useForm();
  const { data: buildingList } = useGetBuildingListQuery({});

  // Watch selected building value
  const selectedBuilding = useWatch({
    control: methods.control,
    name: "building",
  });

  console.log(selectedBuilding,"selectedBuilding")

  // Trigger query for sub-buildings based on selected building
  const { data: subBuildingList } = useGetSubBuildingListQuery(
    selectedBuilding?.value,
    { skip: !selectedBuilding }
  );

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const handleCloseModalForAddRooms = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="w-full bg-white">
        <Box className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Add Level</h2>
          <IconButton onClick={handleCloseModalForAddRooms}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form
            className="flex gap-4 flex-col w-full justify-between h-[75vh]"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box className="flex flex-col gap-4">
              {/* Building Autocomplete */}
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="building"
                    options={
                      buildingList?.data?.map((item: any) => ({
                        label: item.type || "Unknown",
                        value: item.id,
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

              {/* Sub Building Autocomplete */}
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="sub_building"
                    options={
                      subBuildingList?.data?.map((item: any) => ({
                        label: item.type || "Unknown",
                        value: item.id,
                      })) || []
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

              {/* Level Autocomplete */}
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="level"
                    options={["Option 1", "Option 2", "Option 3"]}
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
                Submit
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddRooms;
