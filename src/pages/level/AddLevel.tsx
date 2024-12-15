import { Box, Button, FormControl, IconButton } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import RHFTextField from "../../components/RHF/RHFTextField";
import CloseIcon from "@mui/icons-material/Close";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";

const AddLevels = (props: any) => {
  const { setOpen } = props;
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  const handleCloseModalForAddBuildings = () => {
    setOpen(false);
  };

  return (
    <>
      <Box className="w-full bg-white">
        <Box className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Add Level</h2>
          <IconButton onClick={handleCloseModalForAddBuildings}>
            <CloseIcon />
          </IconButton>
        </Box>
        <FormProvider {...methods}>
          <form
            className="flex gap-4 flex-col w-full justify-between h-[75vh]"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box className="flex flex-col gap-4">
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="building"
                    options={["Option 1", "Option 2", "Option 3"]}
                    label="Building"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <RHFAutocomplete
                    name="sub-building"
                    options={["Option 1", "Option 2", "Option 3"]}
                    label="Sub Building"
                    rules={{ required: "This field is required" }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl fullWidth>
                  <RHFTextField
                    name="levels"
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
                Submit
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </>
  );
};

export default AddLevels;
