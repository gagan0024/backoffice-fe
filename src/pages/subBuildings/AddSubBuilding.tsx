import { Box, Button, IconButton } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import RHFAutocomplete from "../../components/RHF/RHFAutocomplete";
import RHFTextField from "../../components/RHF/RHFTextField";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const AddSubBuildings = (props: any) => {
  const { setOpen } = props;
  const methods = useForm();
  const [fileValue, setFileValue] = useState<any>("");

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
    }
    setFileValue(file);
  };
  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    console.log(fileValue, "hello file");
  };
  const handleCloseModalForAddBuildings = () => {
    setOpen(false);
  };
  return (
    <>
      <Box className="w-full bg-white">
        <Box className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Add Sub Building</h2>
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
                <RHFTextField
                  name="Sub-Building Type"
                  label="Sub-Building Type"
                  rules={{
                    required: "This field is required",
                  }}
                />
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
              <Box>
                <input
                  accept="image/*"
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="file-upload">
                  <Button variant="outlined" component="span">
                    Upload File
                  </Button>
                </label>
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

export default AddSubBuildings;
