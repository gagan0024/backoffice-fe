import { FormControl } from "@mui/material";
import RHFTextField from "../../../components/RHF/RHFTextField";

const Hydrant = () => {
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
          name="flow_capacity"
          label="Flow Capacity"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="pressure_rating"
          label="Pressure Rating"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="location_and_accessibility"
          label="Location and Accessibility"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="durability"
          label="Durability"
          type="number"
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl className="w-1/4">
        <RHFTextField
          name="compliance_with_standards"
          label="Compliance with Standards"
          rules={{ required: true }}
        />
      </FormControl>
    </>
  );
};

export default Hydrant;
